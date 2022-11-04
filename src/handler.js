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
  console.log(event.password);
  console.log(event);
  console.log(event.password);

  user
        .save()
        .then((user) => {
          return {
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
          return {
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

  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   bcrypt.hash(event.password, salt, function (err, hash) {
  //     event.password = hash;
  //     const user = new User(event);
  //     console.log(event);
  //     // const a1 = await user.save();
  //     // res.json(a1);
  //     user
  //       .save()
  //       .then((user) => {
  //         return {
  //           statusCode: 200,
  //           body: JSON.stringify(
  //             {
  //               message: user,
  //             },
  //             null,
  //             2
  //           ),
  //         };
  //       })
  //       .catch((err) => {
  //         return {
  //           statusCode: 400,
  //           body: JSON.stringify(
  //             {
  //               message: "User cannot created!",
  //               error: err,
  //             },
  //             null,
  //             2
  //           ),
  //         };
  //       });
  //   });
  // });
};
