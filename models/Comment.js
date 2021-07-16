const mongoose = require('mongoose') 

const CommentSchema = mongoose.Schema ({
    owner : String ,
    description : String ,
    created_at: {
        type : Date , 
        default : Date.now 
    }
})

module.exports = mongoose.model("Comment", CommentSchema)