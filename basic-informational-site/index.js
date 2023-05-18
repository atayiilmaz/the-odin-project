const express = require('express')
const app = express()
const {readFile} = require('fs').promises

app.get('/', async (req,res) => {
  res.send( await readFile("./index.html", 'utf8'))
})

app.get('/about', async (req,res) => {
  res.send( await readFile("./about.html", 'utf8'))
})

app.get('/contact-me', async (req,res) => {
  res.send( await readFile("./contact-me.html", 'utf8'))
})

app.use(async (req,res) => {
  res.status(404).send( await readFile("./404.html", 'utf8'))
})

app.listen(8080, () => {
  console.log(`Server running on port 8080 on localhost`)
})