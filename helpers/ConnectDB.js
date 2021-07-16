const mongoose = require('mongoose')
require('dotenv').config()
const URL = process.env.MONGO_URL

const ConnectDB = () => {
    mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify: false }, (err) => {
        err ? console.log(err) : console.log("Database connected ...")
    })
}

module.exports = ConnectDB;