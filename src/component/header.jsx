import jwtDecode from "jwt-decode";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/law.png";

export default function Header() {
  const { username } = jwtDecode(localStorage.getItem("token"));
  return (
    <React.Fragment>
      <div className="flex items-center shadow-sm justify-between fixed bg-white w-full px-10 py-7 z-40">
        <Link to={"/dashboard"}>
          <img src={logo} className="h-11 mr-10" alt="logo" />
        </Link>{" "}
        <div className="flex items-center space-x-6">
          <p>{username}</p>
          <div
            style={{
              backgroundImage: `url("https://cdn.pixabay.com/photo/2012/10/10/16/53/soldier-60707_960_720.jpg")`,
            }}
            className="h-10 w-10 bg-cover bg-gray-300 rounded-full"
          ></div>
        </div>
      </div>
    </React.Fragment>
  );
}
