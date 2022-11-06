"use strict";
const bcrypt = require("bcryptjs");
const saltRounds = 5;
var Store = require("./models/store");
var User = require("./models/user");
var connectDB = require("./config/db");

module.exports.createStore = async (event) => {
  console.log("Create store");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Store cannot created!",
      },
      null,
      2
    ),
  };

  const store = new Store(event.body);
  console.log(store);
  console.log("sadfasdf store");

  await store
    .save()
    .then((store) => {
      console.log(store);
      console.log("Done store");
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: store,
          },
          null,
          2
        ),
      };
    })
    .catch((err) => {
      console.log(err);
      console.log("Error store");
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Store cannot created!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done store");

  return body;
};

module.exports.updateStore = async (event) => {
  console.log("Update store");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Store cannot created!",
      },
      null,
      2
    ),
  };

  await Store.findOneAndUpdate(
    { _id: event.pathParameters.storeId },
    event.body
  )
    .then((store) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: store,
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
            message: "Store cannot updated!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done store");

  return body;
};

module.exports.deleteStore = async (event) => {
  console.log("Delete store");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Store cannot deleted!",
      },
      null,
      2
    ),
  };

  await Store.findByIdAndRemove(event.pathParameters.storeId)
    .then((store) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: store,
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
            message: "Store cannot deleted!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done store");

  return body;
};

module.exports.findAllStore = async (event) => {
  console.log("Find All store");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Store cannot find!",
      },
      null,
      2
    ),
  };

  await Store.find()
    .then((store) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: store,
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
            message: "Store cannot find!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done store");

  return body;
};

module.exports.findStoreById = async (event) => {
  console.log("Find One store");
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
  try {
    const store = await Store.findById(event.pathParameters.storeId).populate(
      "owner"
    );

    console.log("store.populated('owner')");
    console.log(store.populated("owner"));
    body = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: store,
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
          message: "Store cannot find!",
          error: err,
        },
        null,
        2
      ),
    };
  }

  console.log("All Done store");

  return body;
};
