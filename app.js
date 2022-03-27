require('dotenv').config();
const express = require('express');
require("./src/db/conn");
const UserRouter = require("./routers/User")

const app = express();
app.use(express.json());


//middlewares
app.use("/api/users",UserRouter);

const  port = process.env.PORT || 3000;

app.listen(port,()=>
{
    console.log(`connection succesful  at port ${port}`);
})
