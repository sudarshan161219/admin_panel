import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/export.mjs";

const auth = async (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  try {
    const payload = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;
