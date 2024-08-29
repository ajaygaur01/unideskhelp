const mongooose  = require("mongoose")


const userschema  = mongooose.Schema({
    password : {
        required : true,
        type : String
    },
    username : {
        required : true,
        type : String,
        unique : true
    },
    email : {
        required : true,
        type : String,
        unique : true
    },
    course : {
        required : true,
        type : String,
    },
    branch : {
        required : true,
        type : String,
    },
    year : {
        required : true,
        type : Number,
    }
} , {timestamps  : true})


module.exports = mongooose.model("user" , userschema)