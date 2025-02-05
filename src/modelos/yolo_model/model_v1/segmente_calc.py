import numpy as np
import cv2
from ultralytics import YOLO
import os
import psutil  # Para medir o uso de CPU e memória
import time  # Para medir o tempo de execução

# Função que converte área de pixels para metros quadrados
def pixel_to_meters_squared(area_pixels, pixel_size_meters):
    area_m2 = area_pixels * (pixel_size_meters ** 2)
    return area_m2

# Função para estimar o número de árvores com base nos pixels segmentados
def estimate_trees_interval(forest_pixels, pixels_per_tree_min=2000, pixels_per_tree_max=2500):
    estimated_trees_min = forest_pixels / pixels_per_tree_max
    estimated_trees_max = forest_pixels / pixels_per_tree_min
    return estimated_trees_min, estimated_trees_max

# Função para monitorar e exibir os recursos computacionais usados
def log_system_usage(stage=""):
    # Obtém o uso de CPU em porcentagem
    cpu_usage = psutil.cpu_percent()
    
    # Obtém o uso de memória em MB
    memory_usage = psutil.virtual_memory().used / (1024 ** 2)
    
    print(f"[{stage}] Uso de CPU: {cpu_usage}%")
    print(f"[{stage}] Uso de memória: {memory_usage:.2f} MB")

# Início do monitoramento
start_time = time.time()

# Carregar o modelo
model = YOLO('./best.pt')

# Registrar o uso de recursos após carregar o modelo
log_system_usage("Após carregar o modelo")

# Carregar a imagem
image = cv2.imread('./img/view/img.png')

# Registrar o uso de recursos após carregar a imagem
log_system_usage("Após carregar a imagem")

# Fazer a predição
prediction_start_time = time.time()
results = model(image)
prediction_end_time = time.time()

# Registrar o uso de recursos após a predição
log_system_usage("Após a predição")

# Exibir o tempo gasto na predição
print(f"Tempo gasto na predição: {prediction_end_time - prediction_start_time:.2f} segundos")

# Obter os nomes das classes
class_names = model.names

# Inicializar a variável que vai somar apenas os pixels da classe "Forest"
forest_pixels = 0

# Loop pelos resultados
for result in results:
    if hasattr(result, 'masks') and result.masks is not None:
        masks = result.masks.data
        classes = result.boxes.cls

        for mask, cls in zip(masks, classes):
            mask = mask.cpu().numpy()

            # Verificar se a classe é "Forest"
            class_name = class_names[int(cls)]
            if class_name == "Forest":
                # Criar uma máscara binária
                binary_mask = (mask > 0.5).astype(np.uint8)
                area_pixels = np.sum(binary_mask)  # Calcular a área da máscara em pixels

                # Somar à variável total de pixels da classe "Forest"
                forest_pixels += area_pixels

                # Redimensionar a máscara binária para combinar com o tamanho da imagem original
                binary_mask_resized = cv2.resize(binary_mask, (image.shape[1], image.shape[0]), interpolation=cv2.INTER_NEAREST)

                # Criar uma máscara colorida
                colored_mask = np.zeros_like(image)
                color = np.random.randint(0, 255, (1, 3)).tolist()[0]
                colored_mask[binary_mask_resized == 1] = color

                # Aplicar a máscara colorida diretamente sobre a imagem original sem escurecê-la
                image[binary_mask_resized == 1] = cv2.addWeighted(image[binary_mask_resized == 1], 0.5, colored_mask[binary_mask_resized == 1], 0.5, 0)

                print(f'A área do objeto segmentado (Forest) é: {area_pixels} pixels')
    else:
        print("Nenhuma máscara encontrada nos resultados.")

# Estimar o número de árvores com intervalo de confiança
estimated_trees_min, estimated_trees_max = estimate_trees_interval(forest_pixels)

# Calcular a estimativa central como a média entre o mínimo e o máximo
estimated_trees_central = (estimated_trees_min + estimated_trees_max) / 2

# Definir o tamanho do pixel em metros (exemplo: 0.01 para 1 cm por pixel)
pixel_size_meters = 0.01

# Converter a área total para metros quadrados
total_area_m2 = pixel_to_meters_squared(forest_pixels, pixel_size_meters)
print(f'A área total segmentada da classe "Forest" é: {forest_pixels} pixels, ou {total_area_m2:.4f} metros quadrados')

# Exibir a estimativa do número de árvores e intervalo de confiança
print(f'O número estimado de árvores é: entre {estimated_trees_min:.0f} e {estimated_trees_max:.0f}, com uma estimativa central de {estimated_trees_central:.0f} árvores.')

# Verificar se o diretório 'img/result' existe, se não, criar o diretório
output_dir = './img/result'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Salvar a imagem resultante com as máscaras sobrepostas
output_path = os.path.join(output_dir, 'result_forest.png')
cv2.imwrite(output_path, image)
print(f'Imagem com as máscaras da classe "Forest" salva em: {output_path}')

# Registrar o uso de recursos após salvar a imagem
log_system_usage("Após salvar a imagem")

# Exibir a imagem resultante
cv2.imshow('Resultado', image)

# Aguardar até que qualquer tecla seja pressionada para fechar a janela
cv2.waitKey(0)
cv2.destroyAllWindows()

# Tempo total de execução
end_time = time.time()
elapsed_time = end_time - start_time
print(f"Tempo total de execução: {elapsed_time:.2f} segundos")
