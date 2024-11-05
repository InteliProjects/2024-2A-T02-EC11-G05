import json
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, JSONResponse
import os
import cv2
import numpy as np
from ultralytics import YOLO
from fastapi.middleware.cors import CORSMiddleware
import time
import traceback

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas as origens
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

# Diretórios para armazenar as imagens e os arquivos de saída
UPLOAD_DIR = "resources"
PROCESSED_DIR = "resources/processed"
METRICS_DIR = "resources/metrics"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
if not os.path.exists(PROCESSED_DIR):
    os.makedirs(PROCESSED_DIR)
if not os.path.exists(METRICS_DIR):
    os.makedirs(METRICS_DIR)

# Carregar o modelo YOLO
model = YOLO('./model/best.pt')

# Novas constantes para as métricas de cada árvore
CO2_PER_TREE = 48  # kg de CO2 sequestrado por árvore por ano
OXYGEN_PER_TREE = 117  # kg de oxigênio produzido por árvore por ano
WATER_PER_TREE = 378  # litros de água retidos por árvore por dia
SOIL_PER_TREE = 200  # kg de solo preservado por árvore por ano
SPECIES_PER_TREE = 10  # espécies suportadas por árvore

# Função que converte área de pixels para metros quadrados
def pixel_to_meters_squared(area_pixels, pixel_size_meters):
    return area_pixels * (pixel_size_meters ** 2)

# Função para estimar o número de árvores com base nos pixels segmentados
def estimate_trees_interval(forest_pixels, pixels_per_tree_min=2000, pixels_per_tree_max=2500):
    estimated_trees_min = forest_pixels / pixels_per_tree_max
    estimated_trees_max = forest_pixels / pixels_per_tree_min
    return estimated_trees_min, estimated_trees_max

# Função para salvar as métricas em um arquivo JSON
def save_metrics_to_json(metrics, filename):
    try:
        with open(filename, 'w') as json_file:
            json.dump(metrics, json_file, indent=4)
        print(f'Métricas salvas em: {filename}')
    except Exception as e:
        print(f'Erro ao salvar métricas em JSON: {e}')

# Função de segmentação
def process_image_with_segmentation(image_path):
    try:
        start_time = time.time()
        image = cv2.imread(image_path)
        if image is None:
            raise Exception(f"Falha ao carregar a imagem: {image_path}")
        
        results = model(image)
        class_names = model.names
        forest_pixels = 0

        for result in results:
            if hasattr(result, 'masks') and result.masks is not None:
                masks = result.masks.data
                classes = result.boxes.cls

                for mask, cls in zip(masks, classes):
                    mask = mask.cpu().numpy()

                    class_name = class_names[int(cls)]
                    if class_name == "Forest":
                        binary_mask = (mask > 0.5).astype(np.uint8)
                        forest_pixels += np.sum(binary_mask)

                        binary_mask_resized = cv2.resize(binary_mask, (image.shape[1], image.shape[0]), interpolation=cv2.INTER_NEAREST)
                        colored_mask = np.zeros_like(image)
                        color = np.random.randint(0, 255, (1, 3)).tolist()[0]
                        colored_mask[binary_mask_resized == 1] = color
                        image[binary_mask_resized == 1] = cv2.addWeighted(image[binary_mask_resized == 1], 0.5, colored_mask[binary_mask_resized == 1], 0.5, 0)

        output_path = os.path.join(PROCESSED_DIR, 'result_forest.png')
        cv2.imwrite(output_path, image)
        end_time = time.time()
        processing_time = end_time - start_time

        # Cálculo das métricas
        estimated_trees_min, estimated_trees_max = estimate_trees_interval(forest_pixels)
        estimated_trees_central = (estimated_trees_min + estimated_trees_max) / 2
        pixel_size_meters = 0.01
        total_area_m2 = pixel_to_meters_squared(forest_pixels, pixel_size_meters)

        # Cálculo das novas métricas com base no número central de árvores
        total_co2 = estimated_trees_central * CO2_PER_TREE  # CO2 sequestrado por ano
        total_oxygen = estimated_trees_central * OXYGEN_PER_TREE  # Oxigênio produzido por ano
        total_water = estimated_trees_central * WATER_PER_TREE * 365  # Água retida por ano (em litros)
        total_soil = estimated_trees_central * SOIL_PER_TREE  # Solo preservado por ano
        total_species = estimated_trees_central * SPECIES_PER_TREE  # Biodiversidade suportada (número de espécies)

        # Exibir as métricas no terminal
        print(f'A área total segmentada da classe "Forest" é: {forest_pixels} pixels, ou {total_area_m2:.4f} metros quadrados')
        print(f'O número estimado de árvores é: entre {int(estimated_trees_min):.0f} e {int(estimated_trees_max):.0f}, com uma estimativa central de {int(estimated_trees_central):.0f} árvores.')
        print(f'Imagem segmentada salva em {output_path}')
        print(f'Tempo de processamento: {processing_time:.2f} segundos')

        # Novas métricas calculadas
        print(f'Total de CO2 sequestrado por ano: {total_co2:.2f} kg')
        print(f'Total de oxigênio produzido por ano: {total_oxygen:.2f} kg')
        print(f'Total de água retida por ano: {total_water:.2f} litros')
        print(f'Total de solo preservado por ano: {total_soil:.2f} kg')
        print(f'Total de espécies suportadas: {total_species:.2f} espécies')

        # Métricas calculadas para salvar no JSON
        metrics = {
            "processed_image": output_path,
            "processing_time": processing_time,
            "forest_pixels": int(forest_pixels),
            "total_area_m2": float(total_area_m2),
            "estimated_trees_min": int(estimated_trees_min),
            "estimated_trees_max": int(estimated_trees_max),
            "estimated_trees_central": int(estimated_trees_central),
            "total_co2": total_co2,
            "total_oxygen": total_oxygen,
            "total_water": total_water,
            "total_soil": total_soil,
            "total_species": total_species
        }

        # Salvar as métricas em um arquivo JSON
        json_filename = os.path.join(METRICS_DIR, 'metrics_forest.json')
        save_metrics_to_json(metrics, json_filename)

        return metrics
    except Exception as e:
        print("Erro ao processar a imagem:", traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Erro ao processar a imagem: {str(e)}")

# Rota para receber a imagem, processá-la e devolver a imagem segmentada e as métricas
@app.post("/segment")
async def segment_image(file: UploadFile = File(...)):
    try:
        # Salvar a imagem recebida
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())

        # Processar a imagem com a função de segmentação e calcular as métricas
        result_data = process_image_with_segmentation(file_location)

        return JSONResponse(content={
            "message": "Imagem processada com sucesso",
            **result_data
        }, status_code=200)
    except Exception as e:
        print("Erro ao processar a imagem no endpoint /segment:", traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Erro ao processar a imagem: {str(e)}")

# Rota para retornar a imagem processada
@app.get("/processed-image")
def get_processed_image():
    processed_image_path = os.path.join(PROCESSED_DIR, 'result_forest.png')
    if os.path.exists(processed_image_path):
        return FileResponse(processed_image_path)
    else:
        raise HTTPException(status_code=404, detail="Imagem processada não encontrada.")

# Rota para retornar as métricas salvas no JSON
@app.get("/metrics")
def get_metrics():
    json_filename = os.path.join(METRICS_DIR, 'metrics_forest.json')
    if os.path.exists(json_filename):
        with open(json_filename, 'r') as json_file:
            metrics = json.load(json_file)
        return JSONResponse(content=metrics)
    else:
        raise HTTPException(status_code=404, detail="Arquivo de métricas não encontrado.")
