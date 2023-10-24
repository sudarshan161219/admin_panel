import { Router } from "express";
const router = Router();
import express from "express";
import multer from "multer";
import { JWT } from "google-auth-library";
import { uploadFile, addItem } from "../controllers/uploadController.mjs";

const upload = multer({ dest: "uploads/" });

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/add_item").post(addItem);


// /api/admin/add_item

export default router;
