import express from 'express'
import db from '../config/db.js'

const router = express.Router();

router.get('/', async (req,res)=>{
    try{
        const [result] = await db.query('SELECT * FROM customers');
        res.json(result)
    }catch (error){
        console.error(error);
        
        res.error(500).error(error)
    }
});

router.post('/', async (req, res) =>{
    try{
        const {name, email, city,} = req.body
        const [rows] = await db.query("SELECT* FROM customers WHERE email = ?", [email]);

        if (rows.length>0) {
            return res.send("Már van ilyen email!")
        }
        const [result] = await db.query("INSERT INTO `customers`(`name`, `email`, `city`) VALUES (?,?,?)", [name, email, city]);


        res.status(201).json(result);
    }
    catch (error){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const [results] = await db.query('DELETE FROM customers WHERE id=?', [req.params.id])

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