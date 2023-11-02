import mongoose from "mongoose";
const { Schema, model } = mongoose;
// name || !description || !coverImg || !author || !content || !tags || !category
const PostSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide title"],
      minlength: 5,
    },

    description: {
      type: String,
      required: [true, "Please provide description"],
      minlength: 10,
    },

    authorName:{
      type: String,
      required: [true, "Please provide author"],
    },

    coverImg: {
      type: String,
    },

    content: {
      type: String,
      required: [true, "Please provide content"],
    },

   tags: {
      type: Array,
    },

    category: {
      type: String,
    },


    author: { type: Schema.Types.ObjectId, ref: "Admin" },
  },

  { timestamps: true }
);

const PostModel = model("Post", PostSchema);

export default PostModel;
