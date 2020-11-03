const jwt = require("jsonwebtoken")


function passwordCheck(){
         return async (req, res, next)=>{
  try{
     if(req.body.length === 0){
         res.status(401).json({ message:"missing required data"
    })

    } else if(!req.body){
    res.status(401).json({ message:"add the required data"
    })  

}else{
    next()
}
    }catch(err){
            next(err)
        }
    }
}

function restrict(){
    return async (req, res, next)=>{
        try{
            const token = req.cookies.token
            if(!token){
                return res.status(401).json({
                message:"Invalid credentials"
            })
            }
            jwt.verify(token,process.env.JWT_SECRET, (err, decoded)=>{
                if(err){
                    return res.status(401).json({
                    message:"Invalid credentials",
                        })	
                    }
                    req.token = decoded

                    next()
                })
    }catch(err){
            next(err)
        }
    }
}


module.exports={
    passwordCheck,
    restrict
    
}