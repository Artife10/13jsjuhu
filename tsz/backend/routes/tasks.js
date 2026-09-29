import express from 'express';
import db from '../config/db.js'

const router = express.Router();

router.get('/', async (req, res) =>{
    try{
        const [totalrows] = await db.query('SELECT COUNT(*) AS total FROM tasks')
        const [statusrows] = await db.query('SELECT status, COUNT(*) as count FROM tasks GROUP BY status');
        
        const stats = {total: totalrows[0].total, TODO: 0, IN_PROGRESS: 0, DONE: 0}

        statusrows.forEach(x=> {
            stats[x.status] = x.coun;
        });
        res.json(stats)
    }
    catch (error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})


export default router;