import { Router } from "express";
const router = Router();
import multer from "multer";

import {
  uploadFile,
  addItem,
  getItem,
} from "../controllers/uploadController.mjs";

const upload = multer({ dest: "uploads/" });

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/add_item").post(addItem);
router.route("/item").get(getItem);

// /api/admin/add_item

export default router;
