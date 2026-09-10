const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());
const port = 3002

const pool = mysql.createPool({
    host: 'localhost',
    user: 'tanulo',
    password: 'tanulo',
    database: 'site',
    waitforConnections: true,
    connectionLimit: 10
})

app.get('/auto', async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM auto");
        if (rows.length >0 && rows != null) {
            res.json(rows);
        }
        else{
            res.send("anyadat");
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

app.post('/auto', async (req,res) =>{
    const {marka, model, ccm, evjarat, szin}= req.body;
    try{
        const [result] =  await pool.query("INSERT INTO `auto`(`marka`, `model`, `ccm`, `evjarat`, `szin`) VALUES (?,?,?,?,?)", [marka, model, ccm, evjarat, szin])
        res.status(201).json(result);

    } catch (error){
        res.status(500).json({error: error.message});
    }
})


app.get('/', (req, res) => {
  res.send('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo-3xQazqEBILK3txDIdOV9qsrfyVTRF_4nrukspOTQ&s">')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})