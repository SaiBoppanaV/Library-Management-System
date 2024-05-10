const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const jwt=require("jsonwebtoken")
const User=require("../Models/Users/memberModel");
const Organization=require("../Models/Users/adminModel")
exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next,role)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("please login to acesss",401))
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
  req.user =  await User.findById(decodedData.id);
  if(!req.user){
    req.user=await Organization.findById(decodedData.id);
  }
  next();
})

exports.authorizeRoles=(...roles)=>{
  return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
    return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403)
  
    )}
    next();
  }
}