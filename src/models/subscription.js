const mongoose = require("mongoose");

const subscription = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stores",
  },
  topic: {
    type: String,
  },
});

module.exports = Subscription = mongoose.model("subscriptions", subscription);
