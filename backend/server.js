//const app=require("./app.js");
const express=require("express")
const app=express();
const dotenv=require("dotenv")
const cors=require("cors")
const fileupload=require("express-fileupload")
const connectDatabase=require("./Config/database");
const errorMiddleWare=require("./Middlewares/error")
const memberRoutes=require("./Routes/memberRoutes")
const cookieParser=require("cookie-parser")
const organizationRoutes=require("./Routes/adminRoutes");
const bookRoutes=require("./Routes/bookRoutes")


dotenv.config()
app.use(fileupload());
app.use(cookieParser())
app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
connectDatabase();


app.listen(3001,()=>{
    console.log(`Server is running on 3001`);
})


//ROUTES
app.use("/api/v2",memberRoutes)
app.use("/api/v2",organizationRoutes);
app.use("/api/v2",bookRoutes);
app.use(errorMiddleWare)