const mongoose=require("mongoose")

const borrowSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'member',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book',
    required: true
  },
  borrowDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  returned: {
    type: Boolean,
    default: false
  },

  });

;
  
  module.exports= mongoose.model('borrow', borrowSchema);