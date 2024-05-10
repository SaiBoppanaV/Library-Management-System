const mongoose=require("mongoose");

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"please enter title"]
    },
    description:{
        type:String,
        required:[true,"please enter description"]
    },
    category:{
        type:String,
        required:[true,"please enter Category"]
    },

  author: {
    type: String,
    required: true
  },

  status:{
    type:String,
    default:"Available"
  }

})

module.exports=mongoose.model("book",bookSchema);
