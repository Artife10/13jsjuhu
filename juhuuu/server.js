import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import customerRouter from './routes/customer.js'
import productsRouter from './routes/products.js'
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.json())
app.use(express.static("assets"))
app.use(cors());
app.use(express.json());

app.use("/customers", customerRouter)
app.use("/products", productsRouter)

app.get('/test', async (req, res)=>{
    try{
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>.</title>
    <style>
        
        html, body {
            margin: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        @keyframes mymove {
        0% {transform: rotate(0deg); scale: 1%;}
        50% {transform: rotate(-360000deg); scale: 150%;}
        100% {transform: rotate(360000deg); scale: 100%;}
        }

        img {
            animation: mymove 90s ease;
            width: 100%;
            height: 100%;
            object-fit: fill;
            display: block;
        }
    
    
    
    </style>
</head>
<body>
<img src="Cabbit.png" alt="bica">
</body>
</html>`);
    }
    catch(error){
        res.send(error)
    }
})


app.listen(PORT, () => {
    console.log(`Szerver fut: http://${process.env.DB_HOST}:${PORT}`);
})