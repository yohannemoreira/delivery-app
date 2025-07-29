# Delivery App
Essa é uma aplicação simples que simula um sistema de entregas, que permite que o usuário realize pedidos informando o endereço de coleta, endereço de entrega e quais itens serão entregues. Além disso, é possível verificar o histórico de pedidos do usuário através do seu id.

## Backend (Ruby on Rails)

1. Instale as dependências:
   ```bash
   cd delivery-backend
   bundle install
   ```
2. Configure o banco de dados:
   ```bash
   rails db:setup
   # ou
   rails db:migrate
   rails db:seed
   ```
3. Inicie o servidor Rails:
   ```bash
   rails server
   ```

## Frontend
1. Instale as dependências:
   ```bash
   cd delivery-frontend
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```


## Melhorias futuras
- Permitir login/registro de usuários e adicionar autenticação;