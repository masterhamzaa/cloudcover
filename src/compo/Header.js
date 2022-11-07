import React from "react";
import logo from "../icons/logo.png";

export default function Header(props) {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="http://localhost:3000/">
        <img
          src={logo}
          width="40"
          height="35"
          className="d-inline-block align-top"
          alt="weather"
        />
      </a>
    </nav>
  );
}
