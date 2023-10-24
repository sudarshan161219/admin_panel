import rateLimit from "express-rate-limit";
import { LimitError } from "../errors/export.mjs";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    throw new LimitError(
      "Too many login attempts from this IP, please try again after a 60 second pause"
    );
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter
