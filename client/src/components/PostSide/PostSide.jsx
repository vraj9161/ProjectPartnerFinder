import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";

const PostSide = ({caller}) => {
  return (
    <div className="PostSide">
      <PostShare/>
      <Posts caller={caller}/>
    </div>
  );
};

export default PostSide;
