require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const createtables = require('./db/createtables');


createtables().then(res => {
    console.log(res,"res create")
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })