import { StatusCodes } from "http-status-codes";
import Admin from "../models/Admin.mjs";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";
import jwt from "jsonwebtoken";
import attachCookie from "../utils/attachCookie.mjs";

//* post register
const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExist = await Admin.findOne({
    email,
  });

  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }

  const user = await Admin.create({
    email,
    name,
    password,
  });
  const Access_Token = user.createAccess_TokenJWT();
  attachCookie({ res, Access_Token });

  return res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

//* post login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await Admin.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  user.password = undefined;

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const Access_Token = user.createAccess_TokenJWT();

  attachCookie({ res, Access_Token });

  return res.status(StatusCodes.OK).json({ user });
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refresh_Token = cookies.jwt;

  jwt.verify(
    refresh_Token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403);
      const { userId } = user;
      const userr = await Admin.findOne({ _id: userId });
      const Access_Token = userr.createAccess_TokenJWT();
      const expiresIn = 3600;
      return res
        .status(StatusCodes.OK)
        .json({ userr, Access_Token, expiresIn });
    }
  );
};

//* PATCH req
const updateUser = async (req, res) => {
  const user = await Admin.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  await user.save();
  const Access_Token = user.createAccess_TokenJWT();
  attachCookie({ res, Access_Token });
  return res.status(StatusCodes.OK).json({
    user,
  });
};

//* get profile
const profile = async (req, res) => {
  const user = await Admin.findOne({ _id: req.user.userId });
  return res.status(StatusCodes.OK).json({
    user,
  });
};

// * post logout
const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

const getAdmin = async (req, res) => {
  const user = await Admin.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};

export { register, login, updateUser, profile, logout, refreshToken, getAdmin };
