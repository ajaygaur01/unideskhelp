const jwt  = require("jsonwebtoken")

// this is for verification of user//
// checking authorization//

const verifytoken = (req , res , next) => { 
    const token = req.cookies.token
    if(!token) {
        console.log("you are not authorized")
        res.json("you are not authorized")
    }
 jwt.verify(token , "secretkeyjustfortest"  , async(err , data) => {
if(err) {
    console.log(err)
    res.json(err)
}
req.UserId = data._id


next()
    })
}

module.exports = verifytoken