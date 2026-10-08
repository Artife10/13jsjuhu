import express from 'express'
import db from '../config/db.js'

const router = express.Router();

router.get('/', async (req,res)=>{
    try{
        const [result] = await db.query('SELECT * FROM products');
        res.json(result)
    }catch (error){
        console.error(error);
        
        res.error(500).error(error)
    }
});

router.post('/', async (req, res) =>{
    try{
        const {name, category, price, stock} = req.body
        const [result] = await db.query("INSERT INTO `products`(`name`, `category`, `price`, `stock`) VALUES (?,?,?,?)", [name, category, price, stock]);


        res.status(201).json(result);
    }
    catch (error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const [results] = await db.query('DELETE FROM products WHERE id=?', [req.params.id])

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