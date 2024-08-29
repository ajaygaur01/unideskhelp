const express  = require("express")
const app = express()
const mongoose = require("mongoose")
const  cors  = require("cors")
const bodyParser = require('body-parser');
const cookieparser = require("cookie-parser")
const authrouter  = require("./Routes/authroute")

try {
    mongoose.connect("mongodb://127.0.0.1:27017/unidesk")
    console.log("database connected")
} catch (error) {
    console.log(error)
}
app.use(cors())
app.use(cookieparser())
app.use(bodyParser.json())


//routes//
app.use("/auth" , authrouter)





app.listen(8000 , () => {
    console.log("server running")
})