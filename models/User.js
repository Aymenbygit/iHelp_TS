const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  avatar: {
    type: String,
    default: "https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png",
  },
  type: {
    type: Boolean,
    default: false,
  },
  password: String,
  gender: String,
  Birth_day: String,
  Phone : String,
  school : String,
  highSchool : String,
  work: String,
  Address : String,
  fb:String,
  git:String,
  linkedin:String,
  contact: {
    type: Array,
    default: [],
  },
  bio: String,
  favorites: {
    type: Array,
    default: [],
  },
  isActive : {
    type : Boolean,
    default : true} , 
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
