import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true, minlength: 3 },
    description: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
    purchaseHistory: [{ date: Date, buyer: String }],
    savedByUsers: [String],
    downloads: [{ date: Date, user: String }],
    tags: [String],
    file: {
      id: String,
      name: String,
    },
  },

  { timestamps: true }
);

const ProductModel = model("Product", ProductSchema);

export default ProductModel;
