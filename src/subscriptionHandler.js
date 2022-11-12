"use strict";
const bcrypt = require("bcryptjs");
const saltRounds = 5;
var Subscription = require("./models/subscription");
var Store = require("./models/store");
var User = require("./models/user");
var Deal = require("./models/deal");
var connectDB = require("./config/db");

module.exports.createSubscription = async (event) => {
  console.log("Create subscription");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Subscription cannot created!",
      },
      null,
      2
    ),
  };

  const subscription = new Subscription(event.body);
  console.log(subscription);
  console.log("sadfasdf subscription");

  await subscription
    .save()
    .then((subscription) => {
      console.log(subscription);
      console.log("Done subscription");
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: subscription,
          },
          null,
          2
        ),
      };
    })
    .catch((err) => {
      console.log(err);
      console.log("Error subscription");
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Subscription cannot created!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done subscription");

  return body;
};

module.exports.updateSubscription = async (event) => {
  console.log("Update subscription");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Subscription cannot created!",
      },
      null,
      2
    ),
  };

  await Subscription.findOneAndUpdate(
    { _id: event.pathParameters.subscriptionId },
    event.body
  )
    .then((subscription) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: subscription,
          },
          null,
          2
        ),
      };
    })
    .catch((err) => {
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Subscription cannot updated!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done subscription");

  return body;
};

module.exports.deleteSubscription = async (event) => {
  console.log("Delete subscription");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Subscription cannot deleted!",
      },
      null,
      2
    ),
  };

  await Subscription.findByIdAndRemove(event.pathParameters.subscriptionId)
    .then((subscription) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: subscription,
          },
          null,
          2
        ),
      };
    })
    .catch((err) => {
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Subscription cannot deleted!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done subscription");

  return body;
};

module.exports.findAllSubscription = async (event) => {
  console.log("Find All subscription");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Subscription cannot find!",
      },
      null,
      2
    ),
  };

  await Subscription.find()
    .then((subscription) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: subscription,
          },
          null,
          2
        ),
      };
    })
    .catch((err) => {
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Subscription cannot find!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done subscription");

  return body;
};

module.exports.findSubscriptionById = async (event) => {
  console.log("Find One subscription");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Error in Request!",
      },
      null,
      2
    ),
  };
  const store123 = new Store({
    name: "Arpico",
    address: "dfdfg,dfgdf,gdfgdf,gdfg",
    openHours: "10.00 AM to 10.00 PM",
    contactNo: "01234536789",
    owner: "6366c3995a0d65446f814b3a",
  });
  try {
    const subscription = await Subscription.findById(
      event.pathParameters.subscriptionId
    ).populate("store");

    console.log("subscription.populated('store')");
    console.log(subscription.populated("store"));
    body = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: subscription,
        },
        null,
        2
      ),
    };
  } catch (error) {
    body = {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Subscription cannot find!",
          error: err,
        },
        null,
        2
      ),
    };
  }

  console.log("All Done subscription");

  return body;
};

module.exports.findSubscriptionByUser = async (event) => {
  console.log("Find One subscription");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Error in Request!",
      },
      null,
      2
    ),
  };
  const user123 = new User({
    first_name: "Saman",
    last_name: "Silva",
    gender: "Male",
    password: "1234",
    type: "ShopOwner",
    address: "dfdfg,dfgdf,gdfgdf,gdfg",
    email: "Nimal11@gmail.com",
    contactNo: "01234536789",
  });
  const store123 = new Store({
    name: "Arpico",
    address: "dfdfg,dfgdf,gdfgdf,gdfg",
    openHours: "10.00 AM to 10.00 PM",
    contactNo: "01234536789",
    owner: "6366c3995a0d65446f814b3a",
  });
  const deal123 = new Deal({
    description: "50% off",
    price: "2500",
    offerCount: "250",
    imageUrl: "01234536789",
    store: "63677ab40465003fe6a9b852",
  });

  try {
    const subscription = await Subscription.find({
      user: event.pathParameters.userId,
    })
      .populate("user")
      .populate("store");

    console.log("subscription.populated('store')");
    console.log(subscription);
    body = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: subscription,
        },
        null,
        2
      ),
    };
  } catch (error) {
    body = {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Subscription cannot find!",
          error: error,
        },
        null,
        2
      ),
    };
  }

  console.log("All Done subscription");

  return body;
};


module.exports.findSubscriptionByUserAndStore = async (event) => {
  console.log("Find One subscription");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Error in Request!",
      },
      null,
      2
    ),
  };
  const user123 = new User({
    first_name: "Saman",
    last_name: "Silva",
    gender: "Male",
    password: "1234",
    type: "ShopOwner",
    address: "dfdfg,dfgdf,gdfgdf,gdfg",
    email: "Nimal11@gmail.com",
    contactNo: "01234536789",
  });
  const store123 = new Store({
    name: "Arpico",
    address: "dfdfg,dfgdf,gdfgdf,gdfg",
    openHours: "10.00 AM to 10.00 PM",
    contactNo: "01234536789",
    owner: "6366c3995a0d65446f814b3a",
  });
  const deal123 = new Deal({
    description: "50% off",
    price: "2500",
    offerCount: "250",
    imageUrl: "01234536789",
    store: "63677ab40465003fe6a9b852",
  });

  try {
    const subscription = await Subscription.find({
      user: event.body.userId,
      store: event.body.storeId,
    });

    console.log("subscription.populated('store')");
    console.log(subscription);
    body = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: subscription,
        },
        null,
        2
      ),
    };
  } catch (error) {
    body = {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Subscription cannot find!",
          error: error,
        },
        null,
        2
      ),
    };
  }

  console.log("All Done subscription");

  return body;
};
