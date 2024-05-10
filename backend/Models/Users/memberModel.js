const mongoose=require("mongoose")
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto")

const memberSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        maxLength:[40,"Name cannot exceed 40 Characters"],
        minLength:[1,"Name should have more than 4 characters"]
    },
    lastName:{
        type:String,
        required:[true,"last name is required"],
        maxLength:[40,"Name cannot exceed 40 Characters"],
        minLength:[1,"Name should have more than 4 characters"]
    },

     email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
     },

    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than 8"],
        select:false
    },
 
    role:{
        type:String,
        default:"member"
    },

    borrowedBooks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book"
    }],

    notifications:[{
        type:String
      }],
   
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

memberSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next() 
    }
this.password=await bcrypt.hash(this.password,10)
})

memberSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

memberSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//password reset
memberSchema.methods.getResetPasswordToken=function(){
    //generating token
    const resetToken=crypto.randomBytes(20).toString("hex")
    
    //hashing and adding resetPasswordToken to Schema
    this.resetPasswordToken=crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")
    
      this.resetPasswordExpire = Date.now()+15*60*1000;
      return resetToken;
    
    }

module.exports=mongoose.model("member",memberSchema);