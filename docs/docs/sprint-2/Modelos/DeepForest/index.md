---
title: Deep Forest V1
sidebar_position: 2
---

## 1. Deep Forest

DeepForest é um pacote Python para treinamento e previsão de objetos ecológicos em imagens aéreas. O DeepForest vem com modelos prontos para uso imediato e ajuste fino. Ambos são módulos de classe única que podem ser estendidos para classificação de espécies com base em novos dados. Os usuários podem expandir esses modelos anotando e treinando modelos personalizados.

### 1.1 Como o DeepForest funciona?

O DeepForest utiliza redes de detecção de objetos baseadas em aprendizado profundo para prever caixas delimitadoras correspondentes a árvores individuais em imagens RGB. O DeepForest é construído sobre o módulo de detecção de objetos do pacote `torchvision` e foi projetado para simplificar o treinamento de modelos para detecção de objetos ecológicos.

### 1.2 Modelos Preexistentes

O DeepForest possui dois modelos prontos para uso: Detecção de Pássaros e Detecção de Copas de Árvores.

#### Detecção de Copas de Árvores

Este modelo foi inicialmente focado em uma única localidade. Ele utiliza uma abordagem semi-supervisionada, onde milhões de anotações de qualidade moderada são geradas automaticamente com um algoritmo não supervisionado de detecção de árvores, baseado em LiDAR. Essas anotações automáticas são refinadas com anotações manuais feitas a partir de imagens RGB de áreas selecionadas.

### 1.3 Demonstração
[Link](https://drive.google.com/file/d/1NbZtUZutQRHHtMlsSrCs7S3_kmipifAk/view?usp=sharing)

### 1.4 Treinamento

Os modelos prontos podem ser aprimorados adicionando dados específicos da área onde serão utilizados. Em nossos estudos, observamos que, mesmo com apenas uma hora de anotações manuais cuidadosamente escolhidas, é possível alcançar melhorias significativas na precisão do modelo. Ajustar o modelo preexistente por 5 a 10 ciclos de treinamento costuma ser suficiente para obter resultados satisfatórios. Planejamos aplicar essa estrategia com os dados fornecido pela Abundance Brasil nas proximas Sprints.
