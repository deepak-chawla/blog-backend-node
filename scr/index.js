const express = require("express");
const app = express();

app.use("/admin",adminRouter);


app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});