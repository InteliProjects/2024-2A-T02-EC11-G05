---
title: Backend 
sidebar_position: 1
---

# Documentação da API de Segmentação de Florestas com FastAPI e YOLO

## Descrição

Esta API foi desenvolvida utilizando FastAPI para processar imagens e realizar segmentação florestal com o modelo YOLO. Ela recebe uma imagem, segmenta áreas de floresta e calcula métricas ambientais com base na estimativa de árvores detectadas. A API permite o upload de imagens, processamento com YOLO, retorno de métricas e acesso às imagens processadas.

## Endpoints

### `POST /segment`

Este endpoint recebe uma imagem, a processa com o modelo YOLO e retorna uma imagem segmentada e métricas ambientais.

- **Parâmetros**:
  - `file: UploadFile` (Imagem a ser processada)

- **Resposta** (Exemplo):
  ```json
  {
    "message": "Imagem processada com sucesso",
    "processed_image": "resources/processed/result_forest.png",
    "processing_time": 2.45,
    "forest_pixels": 450000,
    "total_area_m2": 45.0,
    "estimated_trees_min": 180,
    "estimated_trees_max": 225,
    "estimated_trees_central": 202,
    "total_co2": 9696.0,
    "total_oxygen": 23634.0,
    "total_water": 27706290.0,
    "total_soil": 40400.0,
    "total_species": 2020.0
  }

- Erros: 
    - `500 Internal Server Error`: Caso ocorra algum problema no processamento da imagem.

### `GET /processed-image`

Este endpoint retorna a imagem processada com a segmentação.

- Resposta:

    - Uma imagem PNG segmentada.
- Erros:

    - 404 Not Found: Caso a imagem processada não seja encontrada.

### `GET /metrics`

Este endpoint retorna as métricas calculadas da última imagem processada, armazenadas em um arquivo JSON.

- Resposta:
```
{
  "processed_image": "resources/processed/result_forest.png",
  "processing_time": 2.45,
  "forest_pixels": 450000,
  "total_area_m2": 45.0,
  "estimated_trees_min": 180,
  "estimated_trees_max": 225,
  "estimated_trees_central": 202,
  "total_co2": 9696.0,
  "total_oxygen": 23634.0,
  "total_water": 27706290.0,
  "total_soil": 40400.0,
  "total_species": 2020.0
}
```

- Erros: 
    - `404 Not Found`: Caso o arquivo de métricas não seja encontrado.


## Dependências

- `FastAPI`: Framework web para construção de APIs.
- `Ultralytics YOLO`: Biblioteca para utilização do modelo YOLO de segmentação.
- `OpenCV`: Biblioteca para manipulação e processamento de imagens.
- `NumPy`: Biblioteca para operações matemáticas e manipulação de arrays.

## Instalação

1. Clone o repositório.
2. Instale as dependências necessárias listadas no arquivo requirements.txt.
3. Execute o servidor FastAPI:

```
uvicorn main:app --reload
```

## Detalhes do Código

### Middleware

A API inclui o middleware `CORS`, permitindo acesso de todas as origens (`allow_origins=["*"]`), com suporte a todos os métodos HTTP e cabeçalhos.

### Processamento de Imagem

O código utiliza o modelo YOLO para realizar a segmentação das áreas de floresta em uma imagem. Após a segmentação, várias métricas ambientais são calculadas com base no número estimado de árvores:

- **Métricas calculadas**:
  - Sequestro de CO2 por ano
  - Produção de oxigênio por ano
  - Retenção de água por dia
  - Preservação de solo por ano
  - Suporte à biodiversidade (número de espécies)

### Funções Principais

- **`pixel_to_meters_squared(area_pixels, pixel_size_meters)`**:
  Converte a área de pixels segmentados para metros quadrados.

- **`estimate_trees_interval(forest_pixels, pixels_per_tree_min, pixels_per_tree_max)`**:
  Estima o número de árvores com base na área segmentada e uma estimativa de pixels por árvore.

- **`process_image_with_segmentation(image_path)`**:
  Função principal que processa a imagem com o YOLO, realiza a segmentação e calcula as métricas.

- **`save_metrics_to_json(metrics, filename)`**:
  Salva as métricas calculadas em um arquivo JSON.

---

## Constantes de Métricas Ambientais

O código utiliza as seguintes constantes para estimar os impactos ambientais das árvores segmentadas:

- `CO2_PER_TREE = 48` (kg de CO2 sequestrado por árvore por ano)
- `OXYGEN_PER_TREE = 117` (kg de oxigênio produzido por árvore por ano)
- `WATER_PER_TREE = 378` (litros de água retidos por árvore por dia)
- `SOIL_PER_TREE = 200` (kg de solo preservado por árvore por ano)
- `SPECIES_PER_TREE = 10` (número de espécies suportadas por árvore)

---

## Tratamento de Exceções

O código lida com possíveis exceções ao processar imagens, retornando uma resposta HTTP apropriada com mensagens de erro detalhadas. Em caso de falha, a exceção é logada no terminal e uma resposta de erro `500 Internal Server Error` é enviada ao cliente.

---

## Futuras Melhorias

- Implementar uma interface frontend para visualização das imagens processadas e métricas.
- Adicionar suporte para diferentes tipos de segmentação além de florestas.
- Melhorar a precisão das estimativas de árvores com base em dados adicionais.

---

## Conclusão

Este projeto de API fornece uma solução robusta para segmentação de áreas de floresta em imagens e cálculo de métricas ambientais. Utilizando FastAPI, YOLO e OpenCV, a API processa imagens eficientemente e oferece uma variedade de informações úteis sobre o impacto ambiental das árvores detectadas.


