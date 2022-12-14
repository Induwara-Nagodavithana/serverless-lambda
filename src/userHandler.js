"use strict";
const bcrypt = require("bcryptjs");
const saltRounds = 5;
var User = require("./models/user");
const AWS = require("aws-sdk");
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
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body.password);
  console.log(event.body);
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

module.exports.updateUser = async (event) => {
  console.log("Update user");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
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

  if (event.body.password !== undefined) {
    const hashedPassword = await bcrypt.hash(event.body.password, saltRounds);
    event.body.password = hashedPassword;
  }

  await User.findOneAndUpdate({ _id: event.pathParameters.userId }, event.body)
    .then((user) => {
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
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "User cannot updated!",
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

module.exports.deleteUser = async (event) => {
  console.log("Delete user");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "User cannot deleted!",
      },
      null,
      2
    ),
  };

  await User.findByIdAndRemove(event.pathParameters.userId)
    .then((user) => {
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
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "User cannot deleted!",
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

module.exports.findAllUser = async (event) => {
  console.log("Find All user");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "User cannot find!",
      },
      null,
      2
    ),
  };

  await User.find()
    .then((user) => {
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
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "User cannot find!",
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

module.exports.findUserById = async (event) => {
  console.log("Find One user");
  console.log(event);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "User cannot find!",
      },
      null,
      2
    ),
  };

  await User.findById(event.pathParameters.userId)
    .then((user) => {
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
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "User cannot find!",
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

module.exports.verifyUser = async (event) => {
  console.log("Verify user");
  event.body = JSON.parse(event.body);
  console.log(event);
  console.log(event.body);
  await connectDB();

  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Request has error!",
      },
      null,
      2
    ),
  };
  const user = await User.findOne({
    email: event.body.email,
  });

  console.log("user");
  console.log(user);

  const result =
    user && (await bcrypt.compare(event.body.password, user.password));

  console.log("result");
  console.log(result);

  if (result) {
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
  } else {
    body = {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "User Credentials Failed!",
        },
        null,
        2
      ),
    };
  }

  console.log("All Done user");

  return body;
};

module.exports.uploadUserImage = async (event) => {
  console.log("Upload Image");
  const S3 = new AWS.S3();
  console.log(event);
  // event.body = JSON.parse(event.body);
  // console.log(event);
  console.log(event.body);
  // await connectDB();

  const fileToUpload = {
    userId: "123456",
    email: "enrico@gmail.com",
    city: "London",
    country: "UK",
  };
  try {
    const parsedBody = JSON.parse(event.body);
    const base64File = parsedBody.file;
    console.log("parsedBody");
    console.log(parsedBody);
    console.log(parsedBody.file);
    console.log(parsedBody.type);

    const decodedFile = Buffer.from(
      base64File.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const fileName = Date.now().toString();
    console.log("decodedFile");
    console.log(decodedFile);
    const params = {
      Bucket: "promo-deal-bucket",
      Key: `upload-to-s3/${fileName}.${parsedBody.type}`,
      ACL: "public-read",
      Body: decodedFile,
      ContentType: `image/${parsedBody.type}`,
    };
    const uploadResult = await S3.putObject(params).promise();
    console.log("Upload Completed");
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `upload-to-s3/${fileName}.${parsedBody.type}`,
          uploadResult,
        },
        null,
        2
      ),
    };
  } catch (e) {
    console.log(e);
    console.log("Upload Error", e);
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Upload Error",
          error: e,
        },
        null,
        2
      ),
    };
  }
};
