const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Rollno:
    {
       type:String,
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
    },
    token:{
        type:String,
        required:true
    }

})




const User = new mongoose.model('User',UserSchema);
module.exports = User; 