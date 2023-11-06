import { Router } from "express";
const router = Router();
import multer from "multer";

import {
  uploadFile,
  addItem,
  getItem,
  deleteFile,
  getSingleItem,
  editPost,
} from "../controllers/uploadController.mjs";
import {
  getallpost,
  createPost,
  deletePost,
  getPost,
} from "../controllers/PostController.mjs";
import {
  getAllUsers,
  getUser,
  getSavedItem,
  getPurchasedItem,
} from "../controllers/UsersController.mjs";

const upload = multer({ dest: "uploads/" });

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/deleteFile").post(deleteFile);
router.route("/add_item").post(addItem);
router.route("/item").get(getItem);
router.route("/getPosts").get(getallpost);
router.route("/create-post").post(createPost);
router.route("/delete_post/:id").delete(deletePost);
router.route("/post/:id").get(getPost);
router.route("/get_users").get(getAllUsers);
router.route("/get_user/:id").get(getUser);
router.route("/get__single_item/:id").get(getSingleItem);
router.route("/get_edit_single_item/:id").patch(editPost);
router.route("/get_user_saved_purchased_items/:id").get(getSavedItem);
router.route("/get_user_saved_purchased_items/:id").get(getPurchasedItem);

export default router;
