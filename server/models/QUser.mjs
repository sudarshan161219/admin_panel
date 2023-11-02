import mongoose from "mongoose";
const { Schema, model } = mongoose;
import jwt from "jsonwebtoken";;
import dotenv from "dotenv";
dotenv.config();


const QUserSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },

  userImg: {
    type: String,
  },
  method: { type: String },
});

//* creating jwt token Access_Token
QUserSchema.methods.createAccess_TokenJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_SHORT_LIFETIME,
  });
};

//* creating jwt token Refresh_Token
QUserSchema.methods.createRefresh_TokenJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_LONG_LIFETIME,
  });
};

const QUserModel = model("QUser", QUserSchema);

export default QUserModel;
