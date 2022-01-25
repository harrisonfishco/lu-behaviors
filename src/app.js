const express = require('express')
const app = express()

app.use(express.static('src/public'))

app.use('/res/textures/ui/inventory/skills', express.static('src/res/skills'))

app.get('/', (req, res) => {
    res.sendFile("/index.html")
})

app.get('/create', (req, res) => {
    res.sendFile(__dirname + "/public/create.html")
})

app.get('/scripts/vis', (req, res) => {
    res.sendFile(__dirname + "/utils/vis-network.min.js")
})

app.get('/scripts/base64.js', (req, res) => {
    res.sendFile(__dirname + "/utils/base64.js")
})

app.listen(3000, () => {
    console.log("Listening on port :3000")
})