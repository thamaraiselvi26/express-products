const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello, world RRRR')
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
});

app.get('/product', (req, res) => {
    res.send('All Products')
});

app.post('/', (req, res) => {
    res.send('Post')
});

app.put('/product/:id', (req, res) => {
    res.send('PUT')
});

app.delete('/product/:id', (req, res) => {
    res.send('Delete')
});

app.get('/product/:id', (req, res) => {
    res.send('GET')
});