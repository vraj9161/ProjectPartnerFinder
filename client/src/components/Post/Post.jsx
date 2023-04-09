import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Nominations from "./Nominations";
import { likePost } from "../../api/PostsRequests";
import axios from "axios";
import SellModal from "../ShareModal/ShareModal";
import { useSelector } from "react-redux";

const Post = ({ data, caller }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [message, setMessage] = useState("");
  const [sellYourProject, setsellYourProject] = useState(false);

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

  // get user name by provinding userid

  function UserDetail({ userId }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
      async function fetchUserName() {
        try {
          const response = await fetch(`/user/${userId}`);
          const data = await response.json();

          if (response.ok) {
            setUserName(data.firstname + " " + data.lastname);
          } else {
            console.log('Error retrieving user name:', data.message);
          }
        } catch (error) {
          console.error('Error retrieving user name:', error);
        }
      }

      fetchUserName();
    }, [userId]);

    return (
      <>{userName}</>
    );
  }
  function UserDetailEmail({ userId }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
      async function fetchUserName() {
        try {
          const response = await fetch(`/user/${userId}`);
          const data = await response.json();

          if (response.ok) {
            setUserName(data.email);
          } else {
            console.log('Error retrieving user name:', data.message);
          }
        } catch (error) {
          console.error('Error retrieving user name:', error);
        }
      }

      fetchUserName();
    }, [userId]);

    return (
      <>{userName}</>
    );
  }


  // select partner for the project
  const selectPartner = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/posts/${data._id}/selecteduser`, {
        ...data,
        selectedUserId: e.target.id,
        status: "Selected"
      });
      console.log(response.data);

      sendEmailNotification({ data });

      if (response.status === 200) {
        setMessage("");
        window.location.reload(false);
      }
      // do something with the updated post data
    } catch (error) {
      console.error(error);
    }
  };

  //sell the project
  const sellProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/posts/${data._id}/selecteduser`, {
        ...data,
        status: "Completed"
      });
      console.log(response.data);

      if (response.status === 200) {
        setMessage("");
        window.location.reload(false);
      }
      // do something with the updated post data
    } catch (error) {
      console.error(error);
    }
  }

  const sendEmailNotification = (data) => {
    if (window.Email) {
      window.Email.send({
        SecureToken: "f3dd5723-e964-4cfe-b749-4317a0cf0ff5",
        To: data.email,
        From: "sp6033198@gmail.com",
        Subject: "You have been selected for the project",
        Body: "Your project title is " + data.name + ". For contact here is their email " + user.email,
      }).then(
        message => alert(message)
      );
    }
  }




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
        <span><b>Title: </b>{data.title} </span><br />
        <span><b>Descreption:</b> {data.desc}</span><br />
        <span><b>Skills Required: </b>{data.skillsRequired}</span><br />
        {/* <span><b>Owner: </b></span><br /> */}
      </div>


      {caller !== "profile" && data.status === "Early" &&
        <div className="postReact">
          <input
            type="text"
            placeholder="What values will you provide to this project ?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          {/* <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        /> */}
          {/* <img src={Comment} alt="" /> */}
          {/* <img src={Share} alt="" /> */}
          <button className="button a-button" onClick={handleNomination}>
            Apply
          </button>
        </div>
      }

      {data.status === "Early" && caller === "profile" &&
        <table style={{ width: "100%" }}>
          {
            data.nominations.map(nomination => {
              return (
                <tr key={nomination.usersId}>
                  <td><UserDetail userId={nomination.usersId} /></td>
                  <td>{nomination.message}</td>
                  <td className="buttonDiv"><button className="button s-button" id={nomination.usersId} onClick={selectPartner}>Select</button></td>
                </tr>
              );
            })
          }
        </table>
      }
      {(data.status === "Selected" || data.status === "Completed") && caller === "profile" &&
        <>
          <h4 style={{ textAlign: "center", display: "inline-block" }}><b>Partner Details</b></h4>
          <table>
            <tr>
              <td><b>Project Partner:</b></td>
              <td><UserDetail userId={data.selectedUserId} /></td>
            </tr>
            <tr>
              <td><b>Partner Email: </b></td>
              <td><UserDetailEmail userId={data.selectedUserId} /></td>
            </tr>
          </table>

          {/* complete button */}

          <button className="button a-button" onClick={() => setsellYourProject(true)}>
            Sell
          </button>
          <SellModal sellYourProject={sellYourProject} setsellYourProject={setsellYourProject} />
        </>
      }

    </div>
  );
};

export default Post;
