const mongoose = require("mongoose");


const user = new mongoose.Schema({
    
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      unique:true
    },
    contactNo: {
      type: String,
    }
  }
    
);


module.exports = User = mongoose.model('users', user);