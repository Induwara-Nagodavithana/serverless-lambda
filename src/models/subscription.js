const mongoose = require("mongoose");

const subscription = new mongoose.Schema({
  dealSub: [
    {
      deals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deals",
      },
    },
  ],
  storeSub: [
    {
      stores: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stores",
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Subscription = mongoose.model("subscriptions", subscription);
