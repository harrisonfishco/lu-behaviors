const express = require('express')
const app = express()

app.use(express.static('src/public'))

app.get('/', (req, res) => {
    res.sendFile("/index.html")
})

app.get('/create', (req, res) => {
    res.sendFile(__dirname + "/public/create.html")
})

app.get('/scripts/vis', (req, res) => {
    res.sendFile(__dirname + "/utils/vis-network.min.js")
})

app.listen(3000, () => {
    console.log("Listening on port :3000")
})