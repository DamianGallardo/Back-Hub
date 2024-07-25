import sql from 'mssql';
import { config } from 'dotenv';

config();

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        const result = await pool.request().query("SELECT GETDATE()");
        console.log("result", result);
        return pool;
    } catch (error) {
        console.error(error);
    }
}
