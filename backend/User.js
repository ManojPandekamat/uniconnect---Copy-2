const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username: String,
  email:String,
  password:String,
  usn:String,
  userId:String,
});


//User is the collection we are going to see in our db
module.exports = mongoose.model("User", userSchema);
