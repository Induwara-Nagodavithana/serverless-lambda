const mongoose = require("mongoose");

const deal = new mongoose.Schema({
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  offerCount: {
    type: String,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stores",
  },
});

module.exports = Deal = mongoose.model("deals", deal);
