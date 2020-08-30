
const User =require("../models/user")

exports.signup = (req,res)=>{
     const user = User(req.body);
     
     user.save((err,user)=>{
        console.log("Not Successful");
         if(err){
             return res.status(400).json({
                err:"NOT ABLE TO SAVE USER IN DB"
             })
         }
         
         res.json(user);
         
     });


};

exports.signout = (req,res)=>{
    
    res.json({
        message: "User signout"
    });
}; 

