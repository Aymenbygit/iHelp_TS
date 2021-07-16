const mongoose = require('mongoose') 
const { v4: uuidv4 } = require('uuid');

const PostSchema = mongoose.Schema ({
    owner : {
        type : mongoose.Types.ObjectId , 
        ref : "User"
    }, 
    title : String , 
    description : String ,
    gallery : Array, 
    comments : {
        type : Array ,
        default:[]
    }, 
    created_at: {
        type : Date , 
        default : Date.now 
    }
})

module.exports = mongoose.model("Post", PostSchema)