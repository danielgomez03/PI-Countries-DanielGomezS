import React from 'react';
import { Link } from 'react-router-dom';
import style from "../styles/LandingPage.module.css"


const LandingPage = () => {
  return (
    <div className={style.landing_page}>
      <div className={style.background_image}>
        <div className={style.content}>
          <h1>Bienvenido a mi proyecto</h1>
          <Link to="/home">
          <button className={style.button_home}>Ingresar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;