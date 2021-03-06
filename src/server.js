const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use(routes)

app.listen(port, console.log(`Server started on http://localhost:${port}✨`))
