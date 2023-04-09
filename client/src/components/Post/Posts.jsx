import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import I1 from "../../img/web1.jpeg";
import I2 from "../../img/web2.jpeg";
import I3 from "../../img/web3.jpg";
import I4 from "../../img/web4.jpg";
import { likePost } from "../../api/PostsRequests";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length)
    const [message, setMessage] = useState("");

    const handleNomination = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/posts/${data._id}/nominations`, {
                nominations: {
                    usersId: user._id,
                    message,
                },
            });
            console.log(response.data);

            if (response.status === 200) {
                setMessage("");
            }
            // do something with the updated post data
        } catch (error) {
            console.error(error);
        }
    };

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
            </div>


            <div className="postReacts">
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

                <img
                    src={I4}
                    alt=""
                    style={{ cursor: "pointer", width: "30%" }}
                    onClick={handleLike}
                />

                {/* <img src={Comment} alt="" /> */}
                {/* <img src={Share} alt="" /> */}
                <br />


                <button className="button a-button" onClick={handleNomination} >
                    Buy
                </button>
            </div>
        </div>
    );
};

export default Post;
