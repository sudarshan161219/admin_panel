import { Router } from "express";
const router = Router();

//*--> Import all controllers  <--*//
import {
  register,
  login,
  updateUser,
  profile,
  logout,
  refreshToken,
  getAdmin,
} from "../controllers/adminController.mjs";
import auth from "../middlewares/auth.mjs";
import loginLimiter from "../middlewares/loginLimiter.mjs";

//? POST
router.route("/register").post(register);
router.route("/login").post(loginLimiter, login);
router.route("/logout").post(logout);

//? GET
router.route("/profile").get(auth, profile);
router.route("/refresh").get(refreshToken);
router.route("/update").patch(auth, updateUser);
router.route("/getAdmin").get(auth, getAdmin);

export default router;
