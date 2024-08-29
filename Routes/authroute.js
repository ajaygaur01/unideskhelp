const express = require("express")
const router  = express.Router()
const bcrypt  = require("bcrypt")
const User = require("../models/Usermodel.js")
const jwt  = require("jsonwebtoken")


//register 
router.post("/register" , async (req , res) => {
   try {
    const {email , password , username  , course , branch , year} = req.body

    const salt  = await bcrypt.genSalt(10)
    const hashedpassword = bcrypt.hashSync(password , salt)
    const newuser  = await new User({
        email,
        password : hashedpassword,
        username,
        course,
        branch, 
        year
    })
    newuser.save()
   } catch (error) {
    console.log(error)
    res.json(error)
   }
})

//login//

router.post("/login" , async (req , res) => {
   try {
    const Useremailfromdb = await User.findOne({email : req.body.email})
    if(!Useremailfromdb) {
        res.json("email doesnot exists")
        console.log("email doesnot exist")
    }
    
    const comparisson = await bcrypt.compare(req.body.password , Useremailfromdb.password)
    if(!comparisson) {
        console.log("incorrect password")
        res.json("incorrect password")
    }
    
    const token = jwt.sign ({_id : User._id , username : User.username , email: User.email} , "secretkeyjustfortest" ,{expiresIn : "7d"} )
    const {password , ...info}  = Useremailfromdb._doc
    res.cookie("token" , token).json(info)
    console.log("login success")
        
   } catch (error) {
    console.log(error)
    res.json(error)
   }
})

//logout//

router.post("/logout" , (req  , res) => {
    try {
        res.clearCookie("token")
        res.json("successfully logout")
        console.log("logout")
    } catch (error) {
        console.log(error)
        res.json(error)
    } 
    
})




























module.exports = router