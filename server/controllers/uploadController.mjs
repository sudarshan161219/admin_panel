import { google } from "googleapis";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";
import { JWT } from "google-auth-library";
import fs from "fs";
import Product from "../models/Product.mjs";
import dotenv from "dotenv";
dotenv.config();

// Create a new JWT client
const client = new JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/drive"],
});
const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file was uploaded.");
  }

  const drive = google.drive({ version: "v3", auth: client });

  const file = req.file;
  const fileMetadata = {
    name: file.originalname,
    parents: ["1KLd-P7tYDIuHbu5UwpMXiLPVkypbWqV-"],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id, name",
    },
    (err, uploadedFile) => {
      if (err) {
        console.error("File upload error:", err);
        res.status(500).send("File upload error");
      } else {
        const googlefile = uploadedFile.data;
        return res.status(StatusCodes.OK).json({
          googlefile,
        });
      }
    }
  );
};

const addItem = async (req, res) => {
  const { name, price, imageUrl, tags, driveId, driveName } =
    req.body;

  if (
    !name ||
    !price ||
    !imageUrl ||
    !tags ||
    !driveId ||
    !driveName
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const productAlreadyExist = await Product.findOne({
    name,
  });

  if (productAlreadyExist) {
    throw new BadRequestError("product already exist with similar name");
  }

  req.body.admin = req.user.userId;
  const product = await Product.create(req.body);
  return res.status(StatusCodes.CREATED).json({
    product,
  });
};

const getItem = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // $ Add stuff based on condition
  // if (category !== 'all') {
  //   queryObject.category = category;
  // }

  // if (price !== 0) {
  //   queryObject.price = price;
  // }

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  //$ NO AWAIT
  let result = Product.find(queryObject);

  //$ Chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  //$ setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

  const totalProducts = await Product.countDocuments(queryObject);
  const numofPages = Math.ceil(totalProducts / limit);
  return res.status(StatusCodes.OK).json({ products, totalProducts, numofPages });
};

export { uploadFile, addItem, getItem };
