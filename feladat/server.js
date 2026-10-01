import express from 'express';
import mysql from 'mysql2/promise'
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();
const app = express();
const PORT = 3200;

app.use(express.json());

// GET ALL
app.get('/notes', async (req, res) => {
    try{
        const [notes] = await pool.query('SELECT * FROM notes');
        res.json({notes: notes})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: error, message: 'Internal Server Error'})
    }
});

app.get('/expenses', async (req, res) => {
    try{
        const [notes] = await pool.query('SELECT * FROM expenses');
        res.json({expenses: notes})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: 'ERROR', message: 'Internal Server Error'})
    }
});


// GET by ID

app.get('/notes/:id', async (req, res) => {
    try{
        const [id] = req.params.id;
        const [notes] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);

        if (notes.length == 0) {
             return res.json({message: "nincs ilyen elem"})    
        }

        res.json({note: notes})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: 'ERROR', message: 'Internal Server Error'})
    }
});

app.get('/expenses/:id', async (req, res) => {
    try{
        const [id] = req.params.id;
        const [notes] = await pool.query('SELECT * FROM expenses WHERE id = ?', [id]);

        if (notes.length == 0) {
             return res.json({message: "nincs ilyen elem"})    
        }

        res.json({expense: notes})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: 'ERROR', message: 'Internal Server Error'})
    }
});

//POST

app.post('/notes', async (req, res) => {
    try{
        const {title, content, color, is_pinned} = req.body;
        if (!color) {
            const [notes] = await pool.query('INSERT INTO `notes`(`title`, `content`, `is_pinned`) VALUES (?,?,?)', [title, content, is_pinned]);   
        }
        else{
            const [notes] = await pool.query('INSERT INTO `notes`(`title`, `content`, `color`, `is_pinned`) VALUES (?,?,?,?)', [title, content, color, is_pinned]);   
        }
        res.json({message: "sikerült"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: error, message: 'Internal Server Error'})
    }
});

app.post('/expenses', async (req, res) => {
    try{
        console.log("a")
        const {title, amount, category, payment} = req.body;
        console.log("b")
        if (payment != "CASH" && payment!= "CARD" && payment!="TRANSFER") {
            return res.json({message: "nincs ilyen payment"})    
        }
        console.log("c")
        if (!category) {
            const [expenses] = await pool.query('INSERT INTO `expenses`(`title`, `amount`, `payment`) VALUES (?,?,?)', [title, amount, payment]);   
        }
        else{
            const [expenses] = await pool.query('INSERT INTO `expenses`(`title`, `amount`, `category`, `payment`) VALUES (?,?,?,?)', [title, amount, category, payment]);   
        }
        res.json({message: "sikerült"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: error, message: 'Internal Server Error'})
    }
});

//DELETE

app.delete('/notes/:id', async (req, res) => {
    try{
        const [id] = req.params.id;
        const [notes] = await pool.query('DELETE FROM notes WHERE id = ?', [id]);

        if (notes.length == 0) {
            res.json({message: "nincs ilyen elem"})    
        }

        res.json({message: "sikeresen törölve"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: error, message: 'Internal Server Error'})
    }
});


app.delete('/expenses/:id', async (req, res) => {
    try{
        const [id] = req.params.id;
        const [notes] = await pool.query('DELETE FROM expenses WHERE id = ?', [id]);

        if (notes.length == 0) {
            res.json({message: "nincs ilyen elem"})    
        }

        res.json({message: "sikeresen törölve"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({status: error, message: 'Internal Server Error'})
    }
});




app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);

})