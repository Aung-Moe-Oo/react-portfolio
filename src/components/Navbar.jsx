import React from "react";
import { Link } from "react-router-dom";
import css from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={css.container}>
      <Link to={"/"} className={css.logo}>
        Home
      </Link>
      <div className={css.menu}>
        <Link to={"/contact"}>Contact Me</Link>
      </div>
    </div>
  );
};

export default Navbar;
