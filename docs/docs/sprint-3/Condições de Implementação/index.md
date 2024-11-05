---
title: Condições de Implementação
sidebar_position: 2
---

## Condições de Implementação

A implementação da solução desenvolvida no projeto tem como objetivo automatizar e padronizar a contagem de árvores em grandes áreas florestais a partir de imagens de satélites e drones. Como esse processo, que tradicionalmente é realizado de forma manual e com alto custo de tempo e recursos, se torna mais eficiente com o uso de tecnologias de visão computacional, como o modelo YOLOv8 - Instance Segmentation, utilizado em nosso projeto.

A solução foi desenvolvida para ser executada a princípio localmente, utilizando um servidor configurado em um Raspberry Pi 5. A escolha dessa plataforma permite que o sistema seja acessível e utilizado em áreas remotas, onde a infraestrutura de rede pode ser limitada. Além do mais, o Raspberry Pi serve como o ponto de processamento das imagens, recebendo os dados capturados por drones ou satélites, e realizando o processamento necessário para contar as árvores e calcular o potencial de sequestro de carbono na área analisada.

Em resumo, a arquitetura do sistema é composta por um frontend intuitivo, que fornece acesso a um dashboard para análise de imagens, e um backend responsável pelo processamento dessas imagens e a execução do modelo YOLOv8,  que é utilizado para a segmentação, permitindo uma identificação precisa das árvores. Essa estrutura integrada garante uma experiência de uso fluida e possibilita futuras expansões e melhorias na funcionalidade.

### Instruções de Execução do Frontend

1. **Clonar o Repositório**: Para começar, clone o repositório executando o seguinte comando:

```python
git clone https://github.com/Inteli-College/2024-2A-T02-EC11-G05.git
```
2. **Acessar o Diretório do Frontend**: Navegue até a pasta do frontend com o seguinte comando:

```python
cd \2024-2A-T02-EC11-G05\src\frontend\carbon-check\
```
3. **Iniciar a Interface Gráfica**: Para iniciar a interface gráfica, execute o comando:
   
```python
npm start
```

Após iniciar a interface gráfica, você terá acesso ao dashboard da solução localmente em http://localhost:3000/. Este dashboard foi projetado para ser intuitivo e acessível, oferecendo funcionalidades como upload de imagens para análise, visualização de gráficos com a contagem de árvores e opções para comparar diferentes áreas florestais. Além do frontend, o backend do sistema realiza o processamento das imagens e a execução do modelo, exibindo os logs no dashboard. Isso garantirá que o ambiente de execução seja padronizado e possa ser facilmente configurado. O modelo YOLOv8, responsável pela segmentação das árvores nas imagens, detecta objetos usando caixas delimitadoras. A versão de segmentação fornece máscaras de pixel precisas para cada objeto. Isso permite que o modelo identifique, localize e contorne com exatidão as formas dos objetos.

### Instruções de Execução do Backend

1. **Instalação das Dependências**: Antes de iniciar, certifique-se de instalar as dependências necessárias. Navegue até o diretório do projeto e execute o seguinte comando:

```bash
pip install -r requirements.txt
```
2. **Execução do Script**: Para executar o processo de contagem de árvores de forma automatizada, utilize o seguinte comando:
```python
cd \2024-2A-T02-EC11-G05\src\modelos\yolo_model\model_script> python segmente_calc.py
```
Desse modo, para execução, é carregado com o script ```python3 segmente_calc.py``` (para Linux), que executa todo o processo de contagem de árvores de forma automatizada.

Ao final do processamento, o sistema gera relatório que mostram a quantidade de árvores identificadas, a área de confibilidade de intervalos por essas árvores e uma estimativa do potencial de sequestro de carbono no dashboard. Esses dados são essenciais para o monitoramento ambiental e podem ser utilizados por gestores florestais, ONGs, empresas de créditos de carbono e pesquisadores para embasar decisões e planejar ações de conservação ambiental.

Essa solução não só automatiza a contagem de árvores, mas também oferece uma ferramenta robusta e acessível para monitoramento florestal. O sistema contribui diretamente para projetos de reflorestamento, combate às mudanças climáticas e preservação de ecossistemas, além de promover a inovação tecnológica no campo ambiental.

Para melhor experiencia da interface dashboard [clique aqui](https://www.figma.com/proto/dgvsIn8QOuWolBKhzyxx7p/Carbon-Check?page-id=0%3A1&node-id=148-439&node-type=frame&viewport=921%2C-684%2C0.5&t=XLGXET4hRIfX9pf9-1&scaling=contain&content-scaling=fixed) está disponivel o link do figma:


