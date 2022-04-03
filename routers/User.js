require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const router = new express.Router();
const User = require("../src/models/Users");
const nodemailer = require('nodemailer');


router.post("/register",async(req,res,next)=>
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

router.post('/confirmemail',async(req,res,next) =>
  {    
      const userexixt = await User.findOne({Email: req.body.Email});
      
      if(userexixt){
      try{    
               
             const transporter = nodemailer.createTransport({
                   service:"gmail",
                   auth:{
                    user : "codechef277@gmail.com",
                       pass: "Apiuser@1234"
                   }
               });
               const mailOptions = {
                   from:"codechef277@gmail.com",
                   to:userexixt.Email,
                   subject:"CSI WORKSHOP REGISTRATION",
                   text: "You succesfully registred for workshop"
               };
               transporter.sendMail(mailOptions,function(error,info){
                   if(error)
                   {
                       console.log(error);
                   }
                   else
                   {
                       console.log("Mail sent");
                   }
              })
               res.status(201).send(" sent to your email")
              }
              catch(err)
              {
                  res.status(400).send("Something went wrong");
              }
      }
      else
      {
          res.send("Please enter valid email id")
      }
   })


   router.get("/register",async(req,res,next)=>
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