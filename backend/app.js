const express=require("express")
const app=express();
const memberRoutes=require("./Routes/memberRoutes")
app.use(express.json)

app.use("/api/v2",memberRoutes);

module.exports=app