import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [message, setMessage] = useState("");

  // const getNominations = () => {
  //   const [nominations, setNominations] = useState([]);

  //   useEffect(() => {
  //     axios.get(`http://localhost:5000/posts/${data._id}/nominations`)
  //       .then(response => setNominations(response.data.nominations))
  //       .catch(error => console.log(error));
  //   }, []);

  //   return (
  //     <div>
  //       {nominations.map((item, index) => (
  //         <div key={index}>
  //           <p>{item.user}</p>
  //           <p>{item.value2}</p>
  //           <p>{item.value3}</p>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };
  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />



      {/* <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span> */}
      <div className="detail">
        <span>
          <b>Title: {data.title} </b>
        </span><br />
        <span>Descreption: {data.desc}</span><br />
        <span>Skills Required: {data.skillsRequired}</span><br />
        <span>Project Partner: <b>dev</b> @dev</span><br />
        <span>Technologies: MERN stack</span><br />

      </div>


      <div className="postReact">
        <button className="button a-button">
        Completed
      </button>
        {/* <input
          type="text"
          placeholder="Cover Letter"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        /> */}

        {/* <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        /> */}
        {/* <img src={Comment} alt="" /> */}
        {/* <img src={Share} alt="" /> */}

      </div>
    </div>
  );
};

export default Post;
