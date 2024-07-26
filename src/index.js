import app from './app.js';
import { getConnection } from './database/connection.js';

getConnection();

app.listen(3000);
console.log('Server is running on http://localhost:3000');
