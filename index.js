const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const mongoose = require("mongoose");
require('dotenv').config()
const DB_URL = process.env.MONGO_URL

const PORT = process.env.PORT || 7070
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('Server is running on port: ', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()