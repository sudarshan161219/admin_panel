import { google } from "googleapis";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";
import { JWT } from "google-auth-library";
import fs from "fs";
import credentials from "../credentials.json" assert { type: "json" };
import Product from "../models/Product.mjs";
const { client_email, private_key } = credentials;

// Create a new JWT client
const client = new JWT({
  email: client_email,
  key: private_key,
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
    parents: ["1KLd-P7tYDIuHbu5UwpMXiLPVkypbWqV-"], // Specify the folder ID here
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
        // res.setHeader('Content-Disposition', `attachment; filename="${uploadedFile.data.name}"`);
        // res.status(200).download(file.path); // Trigger the download
      }
    }
  );
};

const addItem = async (req, res) => {
  const { name, description, price, imageUrl, tags, file } = req.body;

  if (!name || !description || !price || !imageUrl || !tags || !file) {
    throw new BadRequestError("Please provide all values");
  }

  const productAlreadyExist = await Product.findOne({
    name,
  });

  if (productAlreadyExist) {
    throw new BadRequestError("product already exist with similar name");
  }

  const product = await Product.create({
    name,
    description,
    price,
    imageUrl,
    tags,
    file,
  });

  return res.status(StatusCodes.CREATED).json({
    product,
  });
};

export { uploadFile, addItem };
