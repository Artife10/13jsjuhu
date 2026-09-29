import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';

import categoriesRouter from './routes/categories.js';
import tasksRouter from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/categories', categoriesRouter);
app.use('/api/tasks', tasksRouter);


app.get('/api/health', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT 1+1 AS result');

        res.json({status: 'OK', dbConnection: true, testResult: rows[0].result})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: 'ERROR', message: 'Internal Server Error'})
    }
});


app.listen(PORT, () => {
    console.log(`Szerver fut: http://${process.env.DB_HOST}:${PORT}`);

})