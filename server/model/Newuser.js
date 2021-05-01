const mongoose = require("mongoose");

const NewuserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  created_by:{
      type: String
  },
  password: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model("newuser", NewuserSchema);