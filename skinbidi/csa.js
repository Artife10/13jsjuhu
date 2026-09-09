const express = require('express');
const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.send('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo-3xQazqEBILK3txDIdOV9qsrfyVTRF_4nrukspOTQ&s">')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})