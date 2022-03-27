const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Parkhi:Parkhi1234@cluster0.iednu.mongodb.net/studentsdata",{useNewUrlParser:true},()=>
console.log("Successfully connected to mongodb database")
);