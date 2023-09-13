import mongoose from "mongoose";
//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
