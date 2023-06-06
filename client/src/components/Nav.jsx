import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Nav.module.css";
import title from "../assets/pngegg.png";

const Nav = () => {
  return (
    <div className={style.nav}>
        <div className={style.img_container}>
          <Link to="/home">
            <img src={title} className={style.logo} alt={"Rick&Morty"} />
          </Link>
          <h1 className={style.wikiTitle}>WikiCountries</h1>
        </div>
      <div className={style.buttonsContainer}>
        <Link to="/home">
          <button className={style.navButton}>Home</button>
        </Link>
        <Link to="/form">
          <button className={style.navButton}>Activity Post</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;