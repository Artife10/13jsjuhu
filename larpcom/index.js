import express from 'express';
import mysql2 from 'mysql2/promise';
import bcrypt from 'bcrypt';
const app = express();
app.use(express.json());
const port = 3300;

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'site2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', (req, res) => {
  res.send('Hello World!');
})

//Regisztraciohoz mi a jelszo

app.post('/register', async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: 'Remélem copilot megbassza magát' });
      //hey grok how to get pussie
    
    }

    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    if (users.length > 0) return res.status(409).json({message: "boo"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const {result} = await pool.query('INSERT INTO users (name, username, password) VALUES (?, ?, ?)', [name, username, hashedPassword]);

    res.status(201).json({ message: 'Juhu!' });

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})


app.post("/login", async (req, res) => {
  try{
    const {username, password} = req.body;
    const [rows] = await pool.query("SELECT* FROM users WHERE username = ?", [username])

    if (rows.length===0) {
      return res.status(401).json({message: "Hibásak az adatok"})
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message: "Regisztráláshoz mi a jelszó"})
    }


    return res.json({message: "Sikeres bejelentkezés"})

  }catch{
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})