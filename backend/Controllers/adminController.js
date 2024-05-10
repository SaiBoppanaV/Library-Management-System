const cloudinary=require("cloudinary")
const catchAsyncErrors=require("../Middlewares/catchAsyncErrors")
const ErrorHandler=require("../Utils/errorHandler");
const sendToken=require("../Utils/jwtToken")
const member=require("../Models/Users/memberModel")
const admin=require("../Models/Users/adminModel")

exports.registerAdmin=catchAsyncErrors(async(req,res,next)=>{
 
  
  const {email,password}=req.body;
    
    const user=await admin.create({
      email,
      password
    })

    if(!user){
        next(new ErrorHandler(400,"admin already exists"))
    }

    sendToken(user,201,res)
})

exports.loginOrg=catchAsyncErrors(async(req,res,next)=>{
    const{email,password}=req.body;
    console.log(req.body)
    //
    if(!email || !password){
      return next(new ErrorHandler("Please Enter email and password",400))
    }
    const user=await admin.findOne({email}).select("+password");
    if(!user){
      return next(new ErrorHandler("Invalid email or password",401));
    }
    const isPasswordMatched=await user.comparePassword(password);
  
  
     if(!isPasswordMatched){
       return next(new ErrorHandler("Invalid Email or Password",401))  
   }
     
   sendToken(user,200,res);
    
  })
  
  //logout
exports.logout=catchAsyncErrors(async(req,res,next)=>{
  
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })
    res.status(200).json({
      success:true,
      message:"Logged Out"
    })
  })



exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.user._id;
    const updatedAdminData = req.body;

    const updatedAdmin = await admin.findByIdAndUpdate(adminId, updatedAdminData, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

