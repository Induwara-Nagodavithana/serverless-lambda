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

module.exports.createUser = async (event) => {
  console.log("Create user");
  console.log(event.password);
  console.log(event);
  console.log(event.password);
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

  // var promises1 = new Promise(function (myResolve, myReject) {
  //   bcrypt.genSalt(saltRounds, function (err, salt) {
  //     bcrypt.hash(event.password, salt, async function (err, hash) {
  //       event.password = hash;
  //       const user = new User(event);
  //       console.log("sadfasdf event");
  //       console.log(event);
  //       // const a1 = await user.save();
  //       // res.json(a1);
  //       await user
  //         .save()
  //         .then((user) => {
  //           myResolve(user); // when successful
  //         })
  //         .catch((err) => {
  //           myReject(err); // when error
  //         });
  //     });
  //   });
  // });

  // promises1.then(
  //   function (value) {
  //     console.log("value user");
  //     console.log(value);

  //     body = {
  //       statusCode: 200,
  //       body: JSON.stringify(
  //         {
  //           message: value,
  //         },
  //         null,
  //         2
  //       ),
  //     };
  //   },
  //   function (error) {
  //     console.log("error");
  //     console.log(error);
  //     body = {
  //       statusCode: 400,
  //       body: JSON.stringify(
  //         {
  //           message: "User cannot created!",
  //           error: error,
  //         },
  //         null,
  //         2
  //       ),
  //     };
  //   }
  // );

  // const promises = async (element) => {
  //   user
  //   .save()
  //   .then((user) => {
  //     console.log(user);
  //     console.log("Done user");
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify(
  //         {
  //           message: user,
  //         },
  //         null,
  //         2
  //       ),
  //     };
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     console.log("Error user");
  //     return {
  //       statusCode: 400,
  //       body: JSON.stringify(
  //         {
  //           message: "User cannot created!",
  //           error: err,
  //         },
  //         null,
  //         2
  //       ),
  //     };
  //   });
  // };
  // await Promise.all(promises);

  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   bcrypt.hash(event.password, salt, async function (err, hash) {
  //     event.password = hash;
  //   });
  // });

  // const user = new User(event);
  // console.log(user);
  // console.log("sadfasdf user");

  //  await user
  //     .save()
  //     .then((user) => {
  //       console.log(user);
  //       console.log("Done user");
  //       body = {
  //         statusCode: 200,
  //         body: JSON.stringify(
  //           {
  //             message: user,
  //           },
  //           null,
  //           2
  //         ),
  //       };
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Error user");
  //       body = {
  //         statusCode: 400,
  //         body: JSON.stringify(
  //           {
  //             message: "User cannot created!",
  //             error: err,
  //           },
  //           null,
  //           2
  //         ),
  //       };
  //     });
  // console.log(err);
  return bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(event.password, salt, async function (err, hash) {
      event.password = hash;
      const user = new User(event);
      console.log(event);
      console.log("event678678768");
      // const a1 = await user.save();
      // res.json(a1);
      await user
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
    });
  });
  // console.log("All Done user");

  // return body;
};
