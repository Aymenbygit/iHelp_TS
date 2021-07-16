const mongoose = require('mongoose') 

const ReportSchema = mongoose.Schema ({
    target : String,
    owner : String ,
    checkbox :String,
    body : String ,
    created_at: {
        type : Date , 
        default : Date.now 
    }
})

module.exports = mongoose.model("Report", ReportSchema)