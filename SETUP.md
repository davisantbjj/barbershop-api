# 🔧 Guia de Setup do Projeto

## 1️⃣ Configurar o MySQL

Você precisa ter o MySQL instalado e rodando. Se não tem, instale a partir de: [mysql.com](https://dev.mysql.com/downloads/mysql/)

### Para Windows:
1. Abra o MySQL Command Line ou use MySQL Workbench
2. Crie o banco de dados:

```sql
CREATE DATABASE barbershop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Verifique o usuário root ou crie um novo usuário:

```sql
-- Ver usuários existentes
SELECT user, host FROM mysql.user;

-- Criar um novo usuário (opcional)
CREATE USER 'seu_usuario'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON barbershop_db.* TO 'seu_usuario'@'localhost';
FLUSH PRIVILEGES;
```

## 2️⃣ Configurar o arquivo .env

Edite o arquivo `.env` com suas credenciais MySQL:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=barbershop_db
JWT_SECRET=uma_chave_secreta_muito_longa_e_complexa
NODE_ENV=development
```

## 3️⃣ Testar Conexão

Execute em um terminal:

```bash
npm start
```

Se tudo estiver correto, você verá:
```
✅ Conexão com banco de dados estabelecida com sucesso!
🚀 Servidor rodando em http://localhost:3000
📚 Documentação disponível em http://localhost:3000/api-docs
```

## 4️⃣ Acessar Documentação

Abra seu navegador em:

```
http://localhost:3000/api-docs
```

## 💡 Dicas

- Use `npm run dev` para modo desenvolvimento com hot-reload
- Use `npm start` para modo produção
- As rotas estão comentadas em `src/app.js` - descomente conforme implementar

## 📚 Próximos Passos

1. Implementar modelos (Users, Clients, Barbers, Appointments)
2. Criar middlewares de autenticação
3. Implementar controllers e services
4. Criar rotas da API

---

Para mais informações, consulte o README.md
