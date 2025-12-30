# 💈 Barbershop API

API RESTful para gerenciamento de uma barbearia, desenvolvida com Node.js e JavaScript, seguindo boas práticas de arquitetura backend, separação de responsabilidades e uso de variáveis de ambiente.

Este projeto foi criado com foco em portfólio, simulando um sistema real utilizado no mercado.

## 🚀 Tecnologias Utilizadas

- Node.js
- JavaScript (ES6+)
- Express.js
- MySQL
- Sequelize ORM
- dotenv
- JWT (JSON Web Token)
- bcryptjs
- Swagger (OpenAPI)

## 📌 Funcionalidades (em desenvolvimento)

- ✅ Estrutura base criada
- ⬜ Cadastro e autenticação de usuários (admin/barbeiro)
- ⬜ Gerenciamento de clientes
- ⬜ Gerenciamento de barbeiros
- ⬜ Agendamento de serviços
- ⬜ Controle de horários disponíveis
- ⬜ Autenticação com JWT
- ⬜ Documentação automática com Swagger

## 🗂️ Estrutura do Projeto

```
barbershop-api/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- Node.js (v18+ recomendado)
- MySQL
- Git

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=barbershop_db

JWT_SECRET=uma_chave_secreta_segura
```

⚠️ O arquivo `.env` não deve ser versionado.

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/barbershop-api.git
```

Acesse a pasta do projeto:

```bash
cd barbershop-api
```

Instale as dependências:

```bash
npm install
```

## ▶️ Executando o Projeto

Modo desenvolvimento (com hot-reload):

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

A API estará disponível em:

```
http://localhost:3000
```

## 📄 Documentação da API (Swagger)

Após subir a aplicação, acesse:

```
http://localhost:3000/api-docs
```

A documentação permite:

- Testar endpoints
- Ver contratos de requisição/resposta
- Visualizar autenticação

## 🧪 Testes de API

Os endpoints podem ser testados utilizando:

- Postman
- Insomnia
- Swagger UI

## 🧠 Boas Práticas Aplicadas

- ✅ Arquitetura em camadas (Controller, Service, Model)
- ✅ Uso de variáveis de ambiente
- ✅ Separação de responsabilidades
- ⬜ Autenticação stateless com JWT
- ⬜ Hash de senhas com bcryptjs
- ⬜ Padronização de commits

## 📌 Próximos Passos

1. Implementar modelos (Users, Clients, Barbers, Appointments)
2. Criar middlewares de autenticação
3. Implementar controllers e services
4. Criar rotas da API
5. Implementar testes automatizados (Jest)
6. Controle de permissões por perfil
7. Deploy em ambiente cloud

## 👨‍💻 Autor

**Davi Santana Loz**
- Desenvolvedor Backend em formação
- Focado em Node.js, APIs REST e boas práticas de desenvolvimento.
