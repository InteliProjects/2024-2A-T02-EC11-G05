---
title: Frontend
---

# Abundance Brasil - Conservação Ambiental Através da Tecnologia

## Visão Geral do Projeto
A **Abundance Brasil** é uma iniciativa que busca transformar a conservação ambiental através da tokenização de florestas. O projeto tem como objetivo gerar créditos de carbono, ajudando a manter as florestas de pé e garantir um futuro sustentável para o planeta.

A plataforma oferece um sistema que automatiza a contagem de árvores utilizando tecnologias avançadas de inteligência artificial e visão computacional. Além disso, permite o upload de imagens capturadas por satélites, gerando dados rápidos e precisos para a gestão ambiental e a criação de créditos de carbono.

## Identidade Visual

A identidade visual do projeto foi desenvolvida com base na temática de sustentabilidade e natureza. As cores principais utilizadas são variações de verde, que representam vida, crescimento e o meio ambiente. Essa paleta de cores está em sintonia com a mensagem de preservação ambiental.

### Cores
- **Verde Escuro**: Utilizado para transmitir a seriedade e importância da preservação das florestas.
- **Verde Claro**: Traz leveza e harmonia, representando a vida e a renovação.
- **Branco**: Usado no texto principal, para garantir contraste e legibilidade sobre o fundo verde.

### Ícones
Os ícones usados na página são simples e com traços suaves, reforçando a ideia de natureza e sustentabilidade. Alguns dos ícones incluem:
- **Planta**: Representa o ciclo de crescimento das florestas e a natureza em geral.
- **Planeta**: Simboliza o compromisso com a preservação ambiental global.
- **Upload**: Um ícone de upload claro e acessível para que os usuários possam facilmente interagir com a funcionalidade de envio de imagens.

## Recursos de Acessibilidade

O projeto também incorpora recursos de acessibilidade, garantindo que a página seja utilizável por todos os públicos. Alguns desses recursos incluem:
- **Contraste de Cores**: O uso de contrastes adequados entre texto e fundo assegura uma leitura clara para pessoas com baixa visão.
- **Tamanho da Fonte**: O texto é exibido em um tamanho que facilita a leitura, com a possibilidade de ajuste conforme necessário.
- **Botões Visíveis**: Os botões, como o de "Fazer Upload", são destacados com cores claras e visíveis, garantindo que qualquer pessoa possa interagir com eles de forma intuitiva.

## Funcionalidades da Página

### Upload de Imagens
O sistema permite que o usuário faça o upload de imagens capturadas por satélites ou drones. A partir dessas imagens, o sistema processa e gera a contagem de árvores, calculando automaticamente créditos de carbono com base nas áreas florestais detectadas.

### Automatização da Contagem de Árvores
Utilizando visão computacional e inteligência artificial, o sistema realiza a contagem automatizada de árvores em áreas florestais. Esses dados são então usados para gerar métricas ambientais, como sequestro de carbono e produção de oxigênio.

## Conclusão

A **landing page** da Abundance Brasil foi projetada com foco em acessibilidade, simplicidade e um design visualmente atraente que reforça a mensagem de conservação ambiental. O uso de cores, ícones e funcionalidades como upload de imagens facilita a interação do usuário, enquanto as tecnologias avançadas garantem precisão e eficiência no processo de contagem de árvores e geração de créditos de carbono.

# Dashboard - Abundance Brasil

## Visão Geral
O **Dashboard** da Abundance Brasil foi projetado para fornecer uma visão clara e direta sobre as métricas ambientais geradas pelo sistema. Após o processamento das imagens florestais enviadas, o sistema calcula e exibe diversas métricas ambientais, que ajudam a entender o impacto das árvores em termos de sequestro de carbono, produção de oxigênio e mais.

A interface é simples, acessível e apresenta os dados mais relevantes de forma visualmente atraente e compreensível para o usuário.

## Métricas Ambientais

As métricas apresentadas no dashboard são calculadas com base na análise das imagens enviadas pelo usuário, utilizando tecnologias de visão computacional e inteligência artificial. As principais métricas incluem:

- **CO2 Sequestrado**: Esta métrica estima a quantidade de dióxido de carbono que as árvores analisadas conseguem sequestrar em um período de um ano. O valor é apresentado em **kg por ano**.
  
  - Exemplo: `CO2 Sequestrado: 350.50 kg por ano`

- **Oxigênio Produzido**: Quantidade de oxigênio produzido pelas árvores, calculado com base no número de árvores estimado. A produção de oxigênio é apresentada em **kg por ano**.
  
  - Exemplo: `Oxigênio Produzido: 500.25 kg por ano`

- **Água Retida**: Esta métrica estima o volume de água que as árvores conseguem reter, ajudando a manter o solo saudável e a prevenir erosão. O valor é apresentado em **litros por ano**.
  
  - Exemplo: `Água Retida: 1500.75 litros por ano`

- **Solo Preservado**: Representa a quantidade de solo que é preservada devido à presença das árvores, contribuindo para a redução de erosão e aumento da qualidade do solo. O valor é apresentado em **kg por ano**.
  
  - Exemplo: `Solo Preservado: 200.60 kg por ano`

- **Biodiversidade Suportada**: Esta métrica estima a quantidade de espécies que o ecossistema florestal suportado pelas árvores analisadas pode sustentar. O valor é apresentado em **número de espécies**.
  
  - Exemplo: `Biodiversidade Suportada: 25.00 espécies`

- **Número Estimado de Árvores**: Esta métrica mostra o intervalo estimado do número de árvores encontradas na área analisada, assim como um valor central que indica a estimativa mais provável. 
  
  - Exemplo: `Número estimado de árvores: 500 a 750, estimativa central: 625`

## Componentes do Dashboard

### 1. Gráfico de Intervalo de Árvores

Este gráfico exibe três informações chave:
- **Valor Mínimo**: A menor estimativa de árvores detectadas.
- **Valor Máximo**: A maior estimativa de árvores detectadas.
- **Valor Central**: A estimativa central, representando o número mais provável de árvores com base na análise das imagens.

### 2. Gráfico de Métricas Ambientais

Este gráfico exibe:
- **Total de Árvores**: O número total de árvores encontradas.
- **Carbono Sequestrado**: A quantidade de CO2 sequestrado pelas árvores, representado em kg por ano.

### 3. Botões de Interação

#### - **Inserir Imagem**: 
Este botão permite ao usuário enviar uma imagem para o sistema, que será analisada para contagem de árvores e cálculo das métricas ambientais.

#### - **Analisar Terreno**: 
Após o envio da imagem, este botão processa a imagem no backend, ativando a contagem de árvores e a análise das métricas ambientais.

#### - **Ver Métricas**: 
Este botão abre um modal com as métricas detalhadas (descritas acima), permitindo ao usuário visualizar os resultados completos da análise do terreno.

## Design do Dashboard

### Cores:
- **Verde**: Usado para botões e ícones, remetendo à sustentabilidade e natureza.
- **Branco**: Utilizado no fundo para proporcionar um design limpo e uma leitura clara.
- **Cinza Claro**: Cor neutra para áreas secundárias do layout, destacando as seções principais.

### Ícones:
- **Árvore**: Representa o número de árvores encontradas.
- **Nuvem de CO2**: Indica a quantidade de carbono sequestrado.

### Acessibilidade:
- **Contraste de Cores**: O uso adequado de cores garante que o texto e os gráficos sejam facilmente legíveis, mesmo para pessoas com deficiência visual.
- **Tamanhos de Fonte**: O texto é exibido em tamanhos que facilitam a leitura, e o design responsivo garante que o dashboard funcione em diversos dispositivos.
- **Botões Visíveis e Claros**: Cada botão é destacado e rotulado de maneira intuitiva, facilitando a interação do usuário com o sistema.

## Conclusão

O **Dashboard** da Abundance Brasil oferece uma interface simples e eficaz para monitorar as métricas ambientais, com foco em acessibilidade e clareza. Através dele, os usuários podem enviar imagens, analisar dados de árvores e visualizar informações essenciais sobre o impacto ambiental, como sequestro de CO2 e suporte à biodiversidade.

