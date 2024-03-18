import { buildRoutePath } from './utils/build-route-path.js';
import getTransactionsHandler from './routes/getTransactions.js';
import postTransactionsHandler from './routes/postTransactions.js';

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/transactions'),
        handler: getTransactionsHandler  
    },
    {
        method: 'POST',
        path: buildRoutePath('/transactions'),
        handler: postTransactionsHandler
    }
];