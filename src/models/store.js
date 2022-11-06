const mongoose = require("mongoose");

const store = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  openHours: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Store = mongoose.model("stores", store);
