const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

require('./src/database/database')()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./src/routes/api')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
