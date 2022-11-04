"use strict";
const bcrypt = require("bcryptjs");
const saltRounds = 5;
var User = require("./models/user");

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

module.exports.createUser = async (event) => {
  console.log("Create user");
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(event.body.password, salt, function (err, hash) {
      event.body.password = hash;
      const user = new User(event.body);
      // const a1 = await user.save();
      console.log(event.body);
      // res.json(a1);
      user
        .save()
        .then((user) => {
          callback(null, user);
          return {
            statusCode: 200,
            body: JSON.stringify(user),
          };
        })
        .catch((err) => {
          return {
            statusCode: 200,
            body: JSON.stringify(err),
          };
        });
    });
  });
};
