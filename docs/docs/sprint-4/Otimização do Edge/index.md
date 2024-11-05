---
title: Otimização do sistema de Edge 
sidebar_position: 3
---
# Otimização de Algoritmos de Visão Computacional em Hardware de Borda (Raspberry Pi 5)

## Introdução

Com o avanço da tecnologia em dispositivos de hardware de borda, como o Raspberry Pi, otimizar a execução de algoritmos de visão computacional é uma necessidade para garantir melhor desempenho sem comprometer significativamente a precisão dos modelos. Este estudo tem como objetivo comparar a eficiência de três modelos de visão computacional para a tarefa de segmentação de imagens, considerando a precisão das predições e o custo computacional. O foco principal está em duas formas de quantização e a degradação do resultado produzido, utilizando o Raspberry Pi 5 como servidor.

## Modelos Escolhidos

Foram implementados três modelos de visão computacional embarcados no Raspberry Pi 5:

1. **YOLOv8 Nano (Segmentação)**: Um modelo compacto e eficiente da série YOLO voltado para dispositivos de borda, otimizado para rapidez e precisão em ambientes de baixa capacidade computacional.
2. **YOLOv8 Small (Segmentação)**: Uma versão mais robusta em termos de estrutura e poder computacional comparado ao Nano, mas ainda destinada a tarefas em dispositivos embarcados.
3. **Deep Forest**: Um modelo de segmentação voltado para detecção de áreas florestais, utilizado aqui como um comparativo em um ambiente com maior densidade de árvores.

---

## Métricas e Desempenho

### 1. YOLOv8 Nano (Segmentação)

O YOLOv8 Nano foi o primeiro modelo testado, e apresentou resultados sólidos em termos de segmentação, conseguindo alcançar uma marcação de aproximadamente 80% de precisão em um tempo médio de 3 segundos. Abaixo estão as métricas de uso de CPU e memória durante o carregamento e processamento da imagem:

- **Uso de CPU após carregar o modelo**: 14.8%
- **Uso de memória após carregar o modelo**: 5102,17 MB
- **Uso de CPU após carregar a imagem**: 21,5%
- **Uso de memória após carregar a imagem**: 5120,52 MB

Com essas métricas, o modelo apresentou uma boa relação entre custo computacional e precisão, tornando-se uma escolha viável para dispositivos embarcados com recursos limitados, como o Raspberry Pi 5.

### 2. YOLOv8 Small

O segundo modelo testado foi o YOLOv8 Small, que, apesar de ser mais robusto, não obteve resultados superiores ao Nano. Observou-se uma queda significativa de aproximadamente 45% na precisão de detecção, e o tempo de processamento foi de cerca de 5 segundos, o que aumenta o custo computacional sem ganhos evidentes na precisão. As métricas obtidas foram:

- **Uso de CPU após carregar o modelo**: 23.5%
- **Uso de memória após carregar o modelo**: 5119,17 MB
- **Uso de CPU após carregar a imagem**: 37,1%
- **Uso de memória após carregar a imagem**: 5170,52 MB

Apesar de ter uma maior utilização de recursos, o YOLOv8 Small não conseguiu justificar essa maior demanda computacional com uma melhoria significativa no desempenho, fazendo com que o YOLOv8 Nano se destacasse.

### 3. Deep Forest

O modelo Deep Forest foi testado como uma alternativa voltada para cenários com alta densidade de árvores. No entanto, o modelo apresentou dificuldades em segmentar e contar corretamente as árvores quando estas estavam muito próximas, comprometendo a precisão do resultado final. Embora não tenha sido realizado um cálculo detalhado do uso de recursos computacionais neste teste, ficou evidente que a complexidade do cenário afetou drasticamente o desempenho do modelo, fazendo com que ele não fosse a melhor escolha para a tarefa de contagem em um ambiente tão denso.

---

## Conclusão

Com base nos testes realizados, o **YOLOv8 Nano** se mostrou o modelo mais eficiente para segmentação em um dispositivo embarcado como o Raspberry Pi 5. Ele alcançou uma alta precisão (80%) com um baixo custo computacional, mantendo um tempo de processamento de apenas 3 segundos. Em comparação, o **YOLOv8 Small** teve um custo computacional mais elevado e uma queda significativa na precisão, tornando-o menos adequado para essa aplicação. Já o **Deep Forest** demonstrou limitações no cenário de alta densidade de árvores, o que comprometeu sua utilidade na contagem correta de árvores.

Portanto, para aplicações embarcadas que exigem segmentação rápida e eficiente, o **YOLOv8 Nano** é a melhor escolha devido à sua combinação de precisão e baixo custo computacional, sendo o modelo mais otimizado para o ambiente de hardware de borda.
