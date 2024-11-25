# FastFeet API

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.10.0-green)
![License](https://img.shields.io/badge/License-MIT-blue)

API desenvolvida para o controle de encomendas de uma transportadora fictícia, a **FastFeet**. Este projeto foi desenvolvido como parte do programa **Ignite** da **Rocketseat** em 2023.

## 📝 Descrição

A **FastFeet API** fornece funcionalidades para gerenciar entregas, transportadores e destinatários. Foi construída com **Node.js**, utilizando o framework **NestJS**, escrita em **TypeScript** e acompanhada de regras de negócio para validação de ações.

## 🎯 Funcionalidades Implementadas

### CRUD de **Usuário**

- **Create**:
  - Tipos de usuário: Administrador, Entregador e Destinatário.
  - Registro de novos usuários.
- **Read**:
  - Login com CPF e senha.
  - Listagem de entregas de um usuário.
- **Update**:
  - Alteração de senha de um usuário.
- **Delete**: Exclusão de usuários.

### CRUD de **Encomendas**

- **Create**:
  - Status padrão: "Aguardando Retirada".
  - Tipos de status: Aguardando Retirada, Retirada, Devolvida e Entregue.
- **Read**:
  - Listagem de encomendas por status ou proximidade geográfica.
  - Filtros por bairro e entregador.
- **Update**:
  - Alteração de status das encomendas.
- **Delete**: Exclusão de encomendas.

### CRUD de **Destinos**

- Criação, leitura, atualização e exclusão de destinos.

## 📜 Regras de Negócio

- Somente Administradores podem realizar operações de CRUD de Usuários e Destinos.
- Apenas Entregadores que retiraram a encomenda podem marcá-la como entregue.
- A entrega de encomendas exige o envio de uma foto.
- Um Entregador não pode visualizar encomendas de outros Entregadores.

## 🌐 Contexto da Aplicação

A API foi projetada para ser consumida por interfaces web e/ou móveis. Confira o layout proposto para a aplicação no Figma:  
[FastFeet Layout](https://www.figma.com/file/hn0qGhnSHDVst7oaY3PF72/FastFeet?type=design&node-id=0-1&mode=design)

## 🚀 Tecnologias Utilizadas

- **Node.js** (>= 20.10.0)
- **NestJS**
- **TypeScript**
- **Prisma**
- **Zod**
- **JWT para autenticação**
- **Vitest para testes**

## 📦 Instalação e Uso

### Pré-requisitos

- **Node.js** (>= 20.10.0)
- **Docker** e **Docker Compose**

### Passo a Passo

1. **Clone o repositório**:

```bash
  git clone https://github.com/Robson16/challenge-ignite-nodejs-05-fast-feet-api.git
  cd challenge-ignite-nodejs-05-fast-feet-api
```

2. **Instale as dependências**:

```bash
  npm install
```

3. **Inicie o banco de dados com Docker Compose**:

```bash
  docker-compose up -d
```

4. **Execute as migrações do banco de dados**:

```bash
  npm run prisma:migrate
```

5. **Inicie o servidor de desenvolvimento**:

```bash
  npm run start:dev
```

6. **Acesse a aplicação em http://localhost:3000**.

## 🧪 Testes

Execute os testes para garantir o funcionamento da API:
`bash
    npm run test
    `
Para obter o relatório de cobertura:

```bash
npm run test:cov
```

## 📄 Licença

Este projeto está licenciado sob os termos da licença MIT. Consulte o arquivo LICENSE para mais detalhes.

## 🤝 Contribuições

Sinta-se à vontade para contribuir! Envie suas sugestões, relatar problemas ou criar pull requests.

Desenvolvido com ❤️ por Robson Henrique Rodrigues.
