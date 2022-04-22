require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const router = new express.Router();
const User = require("../src/models/Users");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const cookieparser = require('cookie-parser');
const { status } = require('express/lib/response');



router.post("/register",async(req,res,next)=>
{    
     // check if email already exixt
     const emailExist = await User.findOne({Email:req.body.Email});
     if(emailExist) return res.status(400).send({error : err, message : "Email id is already registred"});
      const user = new User({
         Name:req.body.Name,
         Rollno:req.body.Rollno,
         Contactno:req.body.Contactno,
         Email:req.body.Email,
         Branch:req.body.Branch,
         Year:req.body.Year,
         Gender:req.body.Gender,
         Residence: req.body.Residence
         
       });
        const maxAge = 3*24*60*60;
        const token = jwt.sign({ _id: user.id},'secret',
        {
          expiresIn: maxAge,
        }
      );
      //adding cookie
       res.cookie('jwtg',token,{htttpOnly:true,maxAge:maxAge*1000});
     
        user.token = token;
       user.save().then(()=>
       {     
            
            res.status(200).send({
            user:user._id,
            message : "User registered succesfully",
            token : user.token,
    
           }); 
          
      }).catch((err)=>{
      
       return res.status(400).send({error : err, message : "Registration is not succesfully done" });
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
               return res.status(200).send({message : "sent to your email" })
              }
              catch(err)
              {
                 return res.status(400).send({message: "Something went wrong" });
              }
      }
      else
      {
          return res.send({message: "Please enter valid email id"})
      }
   })


   router.get("/register",async(req,res,next)=>
{
     try{
         const Usersdata = await User.find();
         return res.send(Usersdata);
     }catch(e)
     {
      return res.send(e);
     }
})

router.get("/confirmemail",async(req,res,next) =>
{
    res.send("Api working properley");
})

module.exports = router;

// {
//     "Name":"Parkhi",
//     "Rollno": "2000270110065",
//     "Contactno":"7668043605",
//     "Email" : "Parkhi2011103@akgec.ac.in",
//     "Branch":"CSIT",
//     "Year":"2",
//     "Gender": "Female",
//     "Residence" : "Hostler"
//     }