const mongoose=require("mongoose")
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const adminSchema=mongoose.Schema({
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
        default:"admin"
    },

    borrowedBooks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book"
    }],

    notifications:[{
        type:String
      }],
})

adminSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

adminSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next() 
    }
this.password=await bcrypt.hash(this.password,10)
})

adminSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


module.exports=mongoose.model("admin",adminSchema);