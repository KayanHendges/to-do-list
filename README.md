# To-do-list

Aplicação Web em React para uma lista de tarefas coloborativa em tempo real.

## Tabela de conteúdos
- [To-do-list](#to-do-list)
  - [Tabela de conteúdos](#tabela-de-conteúdos)
  - [Tecnologias](#tecnologias)
  - [Como Rodar](#como-rodar)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalação](#instalação)
    - [Como Rodar](#como-rodar-1)

## Tecnologias

O projeto é todo feito em [React.js](https://react.dev/) e integrado com o Firebase.

## Como Rodar

### Pré-requisitos

Tecnologias necessárias para utilizar a aplicação:
- [Node.js](https://nodejs.org/en)
- [Projeto no Firebase](https://firebase.google.com/)

### Instalação

```bash
npm install
# ou
yarn install
```
### Como Rodar

Preencha as variáveis de ambiente a partir do arquivo de exemplo:
```bash
cp .env.example .env
```

Inicie a aplicação com o comando:
```bash
yarn dev
```

A aplicação irá rodar na porta configurada na variável ``VITE_APP_PORT``