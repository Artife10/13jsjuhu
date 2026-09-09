const express = require('express');
const mysql = require('mysql2/promise');

const app = express()
const port = 3002

const pool = mysql.createPool({
    host: 'localhost',
    user: 'tanulo',
    password: 'tanulo',
    database: 'site',
    waitforConnections: true,
    connectionLimit: 10
})

app.get('/users', async (req, res) =>{
    try{
        const [rows] = await pool.query("SELECT * FROM users");
        if (rows.length >0) {
            res.json(rows);
        }
        else{
            res.send("anyadat");
        }
    } catch (error){
        res.status(500)
    }
})

app.get('/', (req, res) => {
  res.send('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo-3xQazqEBILK3txDIdOV9qsrfyVTRF_4nrukspOTQ&s">')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})