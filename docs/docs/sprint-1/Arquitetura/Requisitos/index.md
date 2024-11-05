---
title: Requisitos
sidebar_position: 4
---
# **Requisitos funcionais e não funcionais**

Este documento descreve os requisitos funcionais e não funcionais do projeto de contagem de árvores utilizando visão computacional, embarcado em dispositivos de edge computing, desenvolvido para a Abundance Brasil. O objetivo principal do projeto é criar uma solução eficiente e escalável para monitoramento e quantificação de árvores, contribuindo para a certificação de créditos de carbono.

Os requisitos funcionais abrangem as funcionalidades essenciais que o sistema deve possuir para atender às necessidades da Abundance, incluindo a capacidade de detectar, classificar e extrair métricas relevantes. Já os requisitos não funcionais especificam as qualidades desejadas do sistema, como desempenho, confiabilidade, velocidade e disponibilidade, assegurando que a solução seja robusta e capaz de operar em ambientes de produção sob diversas condições.

# **Requisitos funcionais**

| ID   | REQUISITO                                                                                                                  | CLASSIFICAÇÃO |
| ---- | -------------------------------------------------------------------------------------------------------------------------- | --------------- |
| RF01 | Visualizar a imagem escolhida para classificação antes de qualquer computação;                                         | Essencial       |
| RF02 | Realizar a contagem do número de árvores presentes na imagem carregada;                                                  | Essencial       |
| RF03 | Gerar e exibir imagem contendo os limites de classificação das árvores;                                                 | Essencial       |
| RF04 | Obter e exibir as métricas de contagem das árvores, como número total, confiabilidade de classificação, etc;          | Desejável      |
| RF05 | Calcular e exibir métricas derivadas das contagens de árvores, bem como de sua localização na imagem;                  | Essencial       |
| RF06 | Gerar e exibir representações gráficas das estatísticas geradas como sobreposição da imagem originalmente carregada; | Desejável      |
| RF07 | Salvar todas as imagens geradas, bem como suas métricas e derivadas;                                                      | Essencial       |
| RF08 | Permitir que o usuário altere a imagem que selecionou, caso tenha selecionado-a por engano;                               | Essencial       |
| RF09 | A precisão da detecção de cada árvore deve ser maior ou igual a 90%.                                                   | Essencial       |
| RF10 | Possuir design de software modularizado para alteração do modelo de reconhecimento de árvores.                          | Essencial       |

## Requisitos não funcionais

| ID    | REQUISITO                                                                                                                           | CLASSIFICAÇÃO |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| RNF01 | Todo o sistema deve operar de forma embarcada;                                                                                      | Essencial       |
| RNF02 | Admitir imagens de diversas fontes (drones, satélite, etc);                                                                        | Essencial       |
| RNF03 | Possuir sistema de upload de imagens via ícone ou drag and drop;                                                                   | Desejável      |
| RNF04 | Gerar as classificações, métricas e suas derivadas em um tempo inferior a 5 minutos;                                             | Desejável      |
| RNF05 | Possuir design de desenvolvimento modularizado de forma a permitir a fácil atualização do modelo escolhido para classificação; | Desejável      |
| RNF06 | Operar continuamente;                                                                                                               | Essencial       |
| RNF07 | Ser capaz de processar um grande volume de imagens (>100), sequenciamente;                                                          | Desejável      |
| RNF08 | Manter a identificação de árvores para extração das métricas supracitadas em imagens de média qualidade.                     | Desejável      |

## **Conclusão**

Com o estabelecimento dos requisitos funcionais e não funcionais desde o início de um projeto é possível garantir que o desenvolvimento do grupo siga uma direção clara e alinhada com os objetivos da Abundance Brasil. Esses requisitos servem como um guia para todas as etapas subsequentes, desde o design até a implementação e testes, assegurando que o sistema final atenda às expectativas de desempenho, confiabilidade e qualidade. Além disso, uma definição clara de requisitos minimiza riscos, facilita a comunicação entre as equipes e stakeholders, e contribui para o sucesso do projeto como um todo.
