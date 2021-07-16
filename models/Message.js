const mongoose = require('mongoose') 

const MessageSchema = mongoose.Schema ({
    name : String ,
    email : String ,
    subject : String ,
    body : String ,
    read: {
        type : Boolean , 
        default : false
    },
    created_at: {
        type : Date , 
        default : Date.now 
    }
})

module.exports = mongoose.model("Message", MessageSchema)