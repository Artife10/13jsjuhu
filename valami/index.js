const { json } = require('body-parser');
const express = require('express');
const mysql = require('mysql2/promise');

const app = express()
app.use(express.json())

const pool = mysql.createPool({
    host: 'localhost',
    user: 'tanulo',
    password: 'tanulo',
    database: 'konyvtar',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const port = 3300

app.get('/konyvek', async (req, res) => {
  try{
    const [rows] = await pool.query("SELECT * FROM `books` WHERE 1");

    res.json(rows);

  }
  catch{
    res.send("anyad");
  }
});

app.post('/konyvek', async (req, res) =>{
    const {title, author, published_year, is_available} = req.body;

    if (!title || !author || !published_year) {
        return res.status(400).json({error: "Minden mező kitöltése kötelező!"});
    }

     try{
        const [result] =  await pool.query("INSERT INTO `books`(`title`, `author`, `published_year`, `is_available`) VALUES (?,?,?,?)", [title, author, published_year, is_available])
        res.status(201).json(result);

    } catch (error){
        res.status(500).json({error: error.message});
    }
});

app.delete('/konyvek/:id', async (req,res)=> {
    const {id} = req.params

    try{
        const [result] =  await pool.query("DELETE FROM `books` WHERE id = ?", [id])

        if (result.affectedRows === 0) return res.status(404).send("cica");

        res.json({id: Number(id)});

    }catch(error){
        res.status(500).json({error: error.message});
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});