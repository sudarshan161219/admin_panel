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
    parents: ["1-8hriMeVmw6vJxoGHSl6NF_CJzaMm_Bn"],
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

const deleteFile = async (req, res) => {
  const { jsonObject } = req.body;
  const { key1, key2 } = jsonObject;

  await Product.findByIdAndDelete({ _id: key1 });
  deleteGoogleFile(key2);
  res.status(StatusCodes.OK).json({ msg: "Success Product removed" });
};

function deleteGoogleFile(key) {
  const drive = google.drive({ version: "v3", auth: client });
  drive.files.delete({ fileId: key }, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
}

const addItem = async (req, res) => {
  const { name, description, price, imageUrl, tags, driveId, driveName } =
    req.body;

  if (
    !name ||
    !description ||
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
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.search) {
      const searchQuery = new RegExp(req.query.search, "i");
      filter.$or = [{ name: searchQuery }, { description: searchQuery }];
    }

    const sortOptions = {};

    if (req.query.sortBy === "latest") {
      sortOptions.createdAt = -1;
    } else if (req.query.sortBy === "oldest") {
      sortOptions.createdAt = 1;
    }

    // Price filter: Filter products by price range (minimum and maximum)
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {}; // Create a sub-object for price filtering

      if (req.query.minPrice) {
        filter.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filter.price.$lte = Number(req.query.maxPrice);
      }
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.tag) {
      filter.tags = req.query.tag;
    }

    const allProductPromise = Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions);

    const totalProductPromise = Product.countDocuments(filter);

    const [products, totalProducts] = await Promise.all([
      allProductPromise,
      totalProductPromise,
    ]);

    const numofPages = Math.ceil(totalProducts / limit);

    return res.status(StatusCodes.OK).json({
      products,
      totalProducts,
      numofPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
    });
  }
};

const getSingleItem = async (req, res) => {
  const { id: productId } = req.params;

  const item = await Product.findById({ _id: productId });

  return res.status(StatusCodes.CREATED).json({
    item,
  });
};

const editPost = async (req, res) => {
  const { id: productId } = req.params;
  const item = await Product.findById({ _id: productId });
  if (!item) {
    throw new NotFoundError(`No product with id : ${id}`);
  }

  const updatedItem = await Product.findOneAndUpdate({ _id: productId }, req.body);

  res.status(StatusCodes.OK).json({ updatedItem });
};

export { uploadFile, addItem, getItem, deleteFile, getSingleItem, editPost };
