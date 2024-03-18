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

## Implementação

Utilizando React e TailwindCSS.

```tsx
   import { useEffect, useState } from 'react';
   
   interface Transaction {
     idempotencyId: string
     amount: number
     type: string
   }
   
   export default function Home() {
     const [transactions, setTransactions] = useState<Transaction[]>([]);
   
     useEffect(() => {
       const fetchData = async () => {
         try {
           const response = await fetch('http://<host>:<port>/transactions');
           if (!response.ok) {
             throw new Error('Erro ao buscar transações');
           }
           const data = await response.json();
           setTransactions(data);
         } catch (error) {
           console.error(error);
         }
       };
   
       fetchData();
     }, []);
   
     return (
       <main className="flex flex-col bg-stone-900 h-screen px-96 py-8 gap-4">
         <h2 className="text-lg text-stone-400 font-bold mb-4">
           Lista de Transações
         </h2>
         
         <div className="relative overflow-hidden shadow-md rounded-lg">
           <table className="table-fixed w-full text-left">
             <thead className='text-stone-400 uppercase bg-stone-700'>
               <tr>
                 <th className="py-2 text-center font-bold p-4">ID</th>
                 <th className="py-2 text-center font-bold p-4">Amount</th>
                 <th className="py-2 text-center font-bold p-4">Type</th>
               </tr>
             </thead>
             <tbody className='bg-white text-stone-900'>
               {transactions.map(transaction => (
                 <tr key={transaction.idempotencyId} className="py-5">
                   <td className="py-5 p-4">
                     <span>{transaction.idempotencyId}</span>
                   </td>
                   <td className="py-5 text-center p-4">
                     <span>USD {transaction.amount}</span>
                   </td>
                   <td className="py-5 text-center p-4">
                     <span>{transaction.type}</span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </main>
     );
   }
```
