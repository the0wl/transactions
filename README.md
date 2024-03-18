# transactions 

Este repositório contém uma implementação de uma API REST em Node.js que utiliza AWS SQS (Simple Queue Service) para a comunicação assíncrona e DynamoDB como banco de dados NoSQL.

</br>

## Requisitos

Antes de começar, é necessário ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (v18+)
- Conta AWS com acesso ao AWS SQS e DynamoDB

</br>

## Configuração

1. Clone este repositório:

   ```bash
   git clone https://github.com/the0wl/transactions.git
   ```

2. Instale as dependências:

   ```bash
   cd transactions
   npm install
   ```

4. Defina as variáveis de ambiente:

   Renomeie o arquivo `.env.example` para `.env` e defina os valores das variáveis de ambiente conforme necessário.

</br>

## Utilização

1. Inicie o servidor:

   ```bash
   npm start
   ```

2. Acesse a API em `http://localhost:3333`.

> Caso necessário altere a porta alterando a linha `server.listen(3333);` no arquivo `src/server.js`. Considere também, criar uma variável
`PORT` no arquivo .env e fazer a sua leitura nesta linha.

</br>

## Endpoints

- **GET /transactions**: Retorna todos os recursos.
- **POST /transactions**: Cria um novo recurso.

</br>

## Exemplo de Payload

Para criar ou atualizar um recurso, o payload deve ser enviado no formato JSON, por exemplo:

```json
{
  "amount": 1200.00,
  "type": "credit"
}
```

> `type` deve ser do tipo "credit" ou "debit"
