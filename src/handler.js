"use strict";
const bcrypt = require("bcryptjs");
const saltRounds = 5;
var User = require("./models/user");
var connectDB = require("./config/db");
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

async function hashPassword(string) {
  const password = string;
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

module.exports.createUser = async (event) => {
  console.log("Create user");
  console.log(event.body.password);
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "User cannot created!",
      },
      null,
      2
    ),
  };

  const hashedPassword = await bcrypt.hash(event.body.password, saltRounds);
  event.body.password = hashedPassword;
  const user = new User(event.body);
  console.log(user);
  console.log("sadfasdf user");

  await user
    .save()
    .then((user) => {
      console.log(user);
      console.log("Done user");
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: user,
          },
          null,
          2
        ),
      };
    })
    .catch((err) => {
      console.log(err);
      console.log("Error user");
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "User cannot created!",
            error: err,
          },
          null,
          2
        ),
      };
    });
  console.log("All Done user");

  return body;
};
