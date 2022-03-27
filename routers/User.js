require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const router = new express.Router();
const User = require("../src/models/Users");


router.post("/register",async(req,res)=>
{
    const user = new User({
         Name:req.body.Name,
         Rollno:req.body.Rollno,
         Contactno:req.body.Contactno,
         Email:req.body.Email,
         Branch:req.body.Branch,
         Year:req.body.Year,
         Gender:req.body.Gender,
         
       });

       user.save().then(()=>
       {  
            res.status(201).send({
            user:user._id,
            message : "User registered succesfully",
            
           });
      }).catch((err)=>{
       res.status(400).send(err);
      })
})
router.get("/register",async(req,res)=>
{
     try{
         const Usersdata = await User.find();
         res.send(Usersdata);
     }catch(e)
     {
      res.send(e);
     }
})

module.exports = router;
