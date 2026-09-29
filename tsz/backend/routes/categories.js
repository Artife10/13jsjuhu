import express from 'express';
import db from '../config/db.js'

const router = express.Router();

router.get('/', async (req, res) =>{
    try{
        const [results] = await db.query('SELECT * FROM categories')
        res.json(results)
    }
    catch (error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})


export default router;