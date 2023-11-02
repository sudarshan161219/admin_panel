import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true, minlength: 3 },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    imageUrl: { type: String },
    purchaseByUser: [String],
    savedByUsers: [String],
    downloads: [{ date: Date, user: String }],
    tags: [String],
    driveId: { type: String },
    driveName: { type: String },
    admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  },

  { timestamps: true }
);

const ProductModel = model("Product", ProductSchema);

export default ProductModel;
