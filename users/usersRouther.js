const express = require("express")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const db=require("./usersModel")
const { passwordCheck,restrict } = require("./middleware")
const router = express.Router()

router.get("/users",restrict(), async (req, res, next)=>{
    try{
       res.status(200).json(await db.find())

    }catch(err){
    next(err)
    }
})

router.post("/register", passwordCheck(), async (req, res, next)=>{
    try{
const {username, password, department } = req.body
const user = await db.findby({username})
if (user) {
    return res.status(409).json({
        message: "Username is already taken",
    })
}
const newUser =await db.add({
    username,
    password: await bcrypt.hash(password, 14),
    department
})
 res.status(201).json(newUser)
 }catch(err){
    next(err)
    }
})


router.post("/login", async (req, res, next)=>{
    try{
        const { username, password} = req.body
        const theUser = await db.findBy({ username })
    
        if (!theUser) {
          return res.status(400).json({
            message: "You shall not pass!",
          });
        }
        const passwordCheck = await bcrypt.compare(password, theUser.password);

            if (!passwordCheck) {
          return res.status(400).json({
            message: "You shall not pass!",
          });
        }
        
        const token=jwt.sign({
			userId: user.id,
			department:user.department,
        },process.env.JWT_SECRET)
        
        res.cookie("token", token) 

        res.status(200).json({ message: `Welcome ${theUser.username}` });
    }catch(err){
    next(err)
    }
})

module.exports = router
