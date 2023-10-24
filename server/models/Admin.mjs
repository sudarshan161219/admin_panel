import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const AdminSchema = new Schema({
  name: {
    type: String,
    required: [true, "must have name"],
    trim: true,
    unique: true,
    minlength: 3,
    maxlength: [20, "name can not be more than 20 characters"],
  },

  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
    required: [true, "must have email"],
  },

  password: {
    type: String,
    required: true,
    minlength: [6, "Password should have min lenght of 6 char"],
    select: false,
  },
});

//* saving documents
AdminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//* creating jwt token Access_Token
AdminSchema.methods.createAccess_TokenJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_SHORT_LIFETIME,
  });
};

//* creating jwt token Refresh_Token
AdminSchema.methods.createRefresh_TokenJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_LONG_LIFETIME,
  });
};

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
const AdminModel = model("Admin", AdminSchema);

export default AdminModel;
