const express = require('express')
const app = express()
const PORT = process.env.PORT 
const cors = require('cors')

const ConnectDB = require('./helpers/ConnectDB')

//connect to DB
ConnectDB();

//middlewares
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static(__dirname + "/uploads"))

//define Routes
app.use('/register',require('./router/register'))
app.use('/login',require('./router/login'))
app.use('/post',require('./router/post'))
app.use('/profile',require('./router/profile'))
app.use('/comment' , require('./router/comment'))
app.use('/message' , require('./router/message'))

app.listen(process.env.PORT, ()=>
    console.log(`server in running on port: ${process.env.PORT}`)
)
