import express from 'express';
import db from '../config/db.js'

const router = express.Router();

router.get('/stats', async (req, res) =>{
    try{
        const [totalrows] = await db.query('SELECT COUNT(*) AS total FROM tasks')
        const [statusrows] = await db.query('SELECT status, COUNT(*) as count FROM tasks GROUP BY status');
        
        const stats = {total: totalrows[0].total, TODO: 0, IN_PROGRESS: 0, DONE: 0}

        statusrows.forEach(x=> {
            stats[x.status] = x.count;
        });
        res.json(stats)
    }
    catch (error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})


router.get('/', async (req, res) =>{
    try{
        let sql = `SELECT t.id, t.description, t.status, t.priority, t.created_at, c.id AS category_id, c.name AS category_name, c.color AS category_color 
        FROM tasks t LEFT JOIN categories c ON t.category_id = c.id WHERE 1=1`;
        const [results] = await db.query(sql);
        
        res.json(results);

    }
    catch (error){
        res.status(500).json({error: `Internal Server Error: ${error}`})
    }
})

router.post('/', async (req, res) =>{
    try{
        const {title, desc, status, priority, category_id} = req.body
        if (!title) {
            return res.status(400).json({error: 'Cím megadása kötelező'})
        }

        const [result] = await db.query('INSERT INTO tasks (title, description, status, priority, category_id) VALUES (?,?,?,?,?)', [title, desc || '', status || 'TODO', priority || 'MEDIUM', category_id || null]);

        const [newtask] = await db.query(`SELECT t.*, c.name AS category_name, c.color AS category_color FROM tasks t LEFT JOIN categories c ON t.category_id = c.id WHERE t.id=?`, [result.insertId]);

        res.status(201).json(newtask);
    }
    catch (error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const [results] = await db.query('DELETE FROM tasks WHERE id=?', [req.params.id])

        if (results.affectedRows == 0){
            return res.status(404).json({error: 'Nincs olyan báttya'})
        }

        res.json({message: 'Sikeresen törölve'})
    }
    catch (error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})


export default router;