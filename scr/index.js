const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
app.use(express.json());

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.jxqdz.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },()=>{
       console.log('Database connected.') 
});


const authRouter = require('./router/authRouter');
const categoryRouter = require('./router/categoryRouter');
const postRouter = require('./router/postRouter');


app.use("/user",authRouter);
app.use("/category",categoryRouter);
app.use("/post",postRouter);



app.listen(process.env.PORT,()=>{
    console.log(`Server Running on Port ${process.env.PORT}`);
});