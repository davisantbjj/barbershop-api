# 💈 BarberShop API

API REST para gerenciamento de agendamentos de uma barbearia.  
O sistema permite que clientes agendem horários, barbeiros visualizem sua agenda e administradores gerenciem usuários e serviços.

Projeto desenvolvido com foco em **boas práticas de backend**, arquitetura em camadas e regras de negócio reais, ideal para compor portfólio de desenvolvedor **Backend Júnior**.

---

## 🚀 Tecnologias Utilizadas

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security + JWT
- MySQL
- Lombok
- Swagger (OpenAPI)
- Maven

---

## 🧠 Funcionalidades

### 🔐 Autenticação e Autorização
- Cadastro e login de usuários
- Autenticação via JWT
- Controle de acesso por perfil (ADMIN, BARBEIRO, CLIENTE)

### 👤 Usuários
- CRUD de usuários (ADMIN)
- Visualização de perfil (CLIENTE e BARBEIRO)

### ✂️ Serviços
- Cadastro de serviços (nome, descrição, duração e preço)
- Apenas ADMIN pode gerenciar serviços

### 📅 Agendamentos
- Criação de agendamentos
- Validação de conflito de horários
- Cancelamento de agendamento
- Listagem de agendamentos por cliente ou barbeiro

---

## 🧩 Regras de Negócio

- Um barbeiro não pode ter dois agendamentos no mesmo horário
- Cliente só pode cancelar agendamentos com antecedência
- Barbeiro só pode visualizar seus próprios agendamentos
- Apenas ADMIN pode cadastrar serviços e usuários administrativos

---

## 🗂️ Estrutura do Projeto

```text
com.dsl.barbershop
 ├── controller
 ├── service
 ├── repository
 ├── model
 ├── dto
 ├── security
 ├── exception
 └── config
