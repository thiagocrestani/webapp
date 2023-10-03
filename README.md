# Golden Raspberry Awards - Lista de Indicados e Vencedores

Este projeto é uma aplicação React que permite a visualização da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards. A aplicação inclui uma dashboard com informações estatísticas e uma lista completa de todos os filmes. Os dados são obtidos de uma API fornecida.

## Sistema

- **Dashboard**: A dashboard possui 4 painéis com os seguintes recursos:
  1. Uma tabela que mostra os anos que tiveram mais de um vencedor.
  2. Uma tabela que lista os três estúdios com mais vitórias.
  3. Tabelas que mostram os produtores com maior e menor intervalo entre vitórias.
  4. Um campo de busca que permite exibir os vencedores de um ano específico selecionado.

![Exemplo do Dashboard](https://github.com/thiagocrestani/react-front/blob/main/webapp/public/example2.png?raw=true)


- **Lista de Filmes**: A lista de filmes inclui paginação e dois filtros:
  1. Filtro por ano.
  2. Filtro por vencedor.

![Exemplo do Lista de Filmes](https://github.com/thiagocrestani/react-front/blob/main/webapp/public/example1.png?raw=true)

## Requisitos do Projeto

Antes de começar a configurar e executar o projeto, verifique se você possui as seguintes ferramentas e recursos instalados:

- **Node.js**: Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).

- **Yarn**: É recomendável usar o Yarn como gerenciador de pacotes para este projeto. Você pode instalar o Yarn seguindo as instruções em [https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/).

- **Git**: Você precisará do Git para clonar este repositório e gerenciar o controle de versão. Você pode baixar o Git em [https://git-scm.com/](https://git-scm.com/).

- **React**: Este projeto é baseado no framework React. Se você ainda não tem o Create React App instalado globalmente, você pode instalá-lo usando o seguinte comando:

```
yarn global add create-react-app
```

Certifique-se de ter todas essas ferramentas instaladas e configuradas antes de seguir as instruções de execução do projeto mencionadas anteriormente.

## Como Rodar o Projeto

Siga as etapas abaixo para configurar e executar o projeto:

1. Clone este repositório em sua máquina local:
```
git clone https://github.com/thiagocrestani/webapp.git
```
2. Navegue até o diretório do projeto:
```
cd webapp
```
3. Instale as dependências usando o Yarn:
```
yarn install
```

4. Inicie o servidor de desenvolvimento:
```
yarn start
```

5. Abra seu navegador e acesse `http://localhost:3000` para visualizar a aplicação.

## Como Executar os Testes

Para executar os testes unitários, utilize o seguinte comando:
```
yarn test
```
Isso executará todos os testes e exibirá os resultados no terminal.

![Exemplo testes](https://github.com/thiagocrestani/react-front/blob/main/webapp/public/example3.png?raw=true)


## API de dados

Os dados são obtidos através da API fornecida em `https://tools.texoit.com/backend-java/api/movies`.
