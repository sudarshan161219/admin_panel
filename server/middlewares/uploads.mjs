import multer from "multer";
import path from "path";
import User from "../models/User.mjs";

const fileUpload = async (req, res, next) => {
try {
   const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "profile");
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + "-" + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage }).single("profileImg");
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(req.file)
  });
  next();
} catch (error) {
  console.log(error);
}
 
};

export default fileUpload;
