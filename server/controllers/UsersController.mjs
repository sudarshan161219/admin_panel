import { StatusCodes } from "http-status-codes";
import Post from "../models/Post.mjs";
import User from "../models/User.mjs";
import QUser from "../models/QUser.mjs";
import Product from "../models/Product.mjs";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";

const getUser = async (req, res) => {
  const { id: userId } = req.params; // Assuming you pass the user ID as a parameter
  try {
    let user;

    // Check if the user is a LocalUser
    const localUser = await User.findById(userId);
    if (localUser) {
      user = localUser;
    }

    // If not a LocalUser, check if the user is a GoogleUser
    if (!user) {
      const googleUser = await QUser.findById(userId);
      if (googleUser) {
        user = googleUser;
      }
    }

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: `No user with ID: ${userId}`,
      });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
    });
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 15;
//     const skip = (page - 1) * limit;

//     const filter = {};

//     if (req.query.search) {
//       const searchQuery = new RegExp(req.query.search, "i");
//       // Modify the filter to match the fields in your user models
//       filter.$or = [{ name: searchQuery }, { email: searchQuery }]; // Adjust the fields as needed
//     }

//     // Create an array to store the results from both user models
//     const allUsers = [];

//     // Fetch users from the local authentication user model
//     const localAuthUsers = await User.find(filter).skip(skip).limit(limit);

//     // Fetch users from the Google authentication user model
//     const googleAuthUsers = await QUser.find(filter)
//       .skip(skip)
//       .limit(limit);

//     // Combine the results from both models
//     allUsers.push(...localAuthUsers, ...googleAuthUsers);

//     // You may need to adjust the sorting and pagination logic to fit your needs

//     const numofPages = Math.ceil(allUsers.length / limit);

//     return res.status(StatusCodes.OK).json({
//       users: allUsers,
//       totalUsers: allUsers.length,
//       numofPages,
//     });
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: "Server error",
//     });
//   }
// };
const getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.search) {
      const searchQuery = new RegExp(req.query.search, "i");
      // Modify the filter to match the email field in your user models
      filter.email = searchQuery;
    }

    // Create an array to store the results from both user models
    const allUsers = [];

    // Fetch users from the local authentication user model
    const localAuthUsers = await User.find(filter).skip(skip).limit(limit);

    // Fetch users from the Google authentication user model
    const googleAuthUsers = await QUser.find(filter).skip(skip).limit(limit);

    // Combine the results from both models
    allUsers.push(...localAuthUsers, ...googleAuthUsers);

    // You may need to adjust the sorting and pagination logic to fit your needs

    const numofPages = Math.ceil(allUsers.length / limit);

    return res.status(StatusCodes.OK).json({
      users: allUsers,
      totalUsers: allUsers.length,
      numofPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server error",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id: postId } = req.params;
  await Post.findByIdAndDelete({ _id: postId });
  res.status(StatusCodes.OK).json({ msg: "Success Post  removed" });
};

const getSavedItem = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const savedItems = await Product.find({ savedByUsers: userId });
    res.status(StatusCodes.OK).json({ savedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPurchasedItem = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const purchasedItems = await Product.find({ purchaseByUser: userId });
    res.status(StatusCodes.OK).json({ purchasedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { getAllUsers, deleteUser, getUser, getSavedItem, getPurchasedItem};
