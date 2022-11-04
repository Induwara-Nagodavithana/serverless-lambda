const mongoose = require("mongoose");

const URI = 'mongodb+srv://newUser:admin@cluster0.rjm7k.mongodb.net/PromoApp?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology:true,
    useNewUrlParser: true
  });
  console.log('DB connected ....');
}


module.exports = connectDB;
