import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    skillsRequired: { type: String, required: true },
    status: { type: String, required: true, default: 'Early' },
    nominations: [{
      usersId: { type: String },
      message: { type: String }
    }],
    selectedUserId:{
      type:String
    },
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
