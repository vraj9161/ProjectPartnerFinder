import React from "react";

import Home from "../../img/home.png";
import Shop from "../../img/shop.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons" style={{display:"flex",justifyContent:"space-around"}}>
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <Link to="../shop">
        <img src={Shop} alt="" />
      </Link>
      {/* <UilSetting /> */}
      {/* <img src={Noti} alt="" /> */}
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
