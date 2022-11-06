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
  deal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deals",
  },
});

module.exports = Subscription = mongoose.model("subscriptions", subscription);
