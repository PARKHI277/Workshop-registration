const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Rollno:
    {
       type:Number,
       required:true,
       maxlength:13,
       unique:true
    },
    Contactno:
    {
        type:Number,
        required:true,
        maxlength:10,
        minlength:10,
        unique:true
    },
    Email:
    {
       type:String,
       required:'Email address is required',
       lowercase:true.valueOf,
       unique:true
    },
    Branch:
    {
        type:String,
        required:true
    },
    Year:
    {
        type:Number,
        required:true,
    },
    Gender:
    {
        type:String,
        required:true
    },
    Residence:
    {
       type:String,
       required : true
    }
    // token:{
    //     type:String,
    //     required:true
    // }

})

// UserSchema.statics.isThisEmailInUse = async function(Email)
// {   if(!Email) throw new Error('Email field can not be empty')
//     try{
//     const user = await this.findOne({Email})
//     if(user)
//     {
//         res.status(400).send("Email is already registred");
//     }
//     else
//     {
//         res.status(201).send("Email is valid");
//     }
// } catch(error)
// {
//     console.log('error-inside isthisEmailinuse method',error.message);
//     return false;
// }
// }

const User = new mongoose.model('User',UserSchema);
module.exports = User; 