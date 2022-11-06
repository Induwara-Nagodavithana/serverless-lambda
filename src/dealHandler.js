"use strict";
const bcrypt = require("bcryptjs");
const saltRounds = 5;
var Deal = require("./models/deal");
var Store = require("./models/store");
var connectDB = require("./config/db");

module.exports.createDeal = async (event) => {
  console.log("Create deal");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Deal cannot created!",
      },
      null,
      2
    ),
  };

  const deal = new Deal(event.body);
  console.log(deal);
  console.log("sadfasdf deal");

  await deal
    .save()
    .then((deal) => {
      console.log(deal);
      console.log("Done deal");
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: deal,
          },
          null,
          2
        ),
      };
    })
    .catch((err) => {
      console.log(err);
      console.log("Error deal");
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Deal cannot created!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done deal");

  return body;
};

module.exports.updateDeal = async (event) => {
  console.log("Update deal");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Deal cannot created!",
      },
      null,
      2
    ),
  };

  await Deal.findOneAndUpdate({ _id: event.pathParameters.dealId }, event.body)
    .then((deal) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: deal,
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
            message: "Deal cannot updated!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done deal");

  return body;
};

module.exports.deleteDeal = async (event) => {
  console.log("Delete deal");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Deal cannot deleted!",
      },
      null,
      2
    ),
  };

  await Deal.findByIdAndRemove(event.pathParameters.dealId)
    .then((deal) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: deal,
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
            message: "Deal cannot deleted!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done deal");

  return body;
};

module.exports.findAllDeal = async (event) => {
  console.log("Find All deal");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Deal cannot find!",
      },
      null,
      2
    ),
  };

  await Deal.find()
    .then((deal) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: deal,
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
            message: "Deal cannot find!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done deal");

  return body;
};

module.exports.findDealById = async (event) => {
  console.log("Find One deal");
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
    const deal = await Deal.findById(event.pathParameters.dealId).populate(
      "store"
    );

    console.log("deal.populated('store')");
    console.log(deal.populated("store"));
    body = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: deal,
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
          message: "Deal cannot find!",
          error: err,
        },
        null,
        2
      ),
    };
  }

  console.log("All Done deal");

  return body;
};

module.exports.findDealByStore = async (event) => {
  console.log("Find One deal");
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
    const deal = await Deal.find({
      store: event.pathParameters.storeId,
    });

    console.log("deal.populated('store')");
    console.log(deal);
    body = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: deal,
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
          message: "Deal cannot find!",
          error: error,
        },
        null,
        2
      ),
    };
  }

  console.log("All Done deal");

  return body;
};
