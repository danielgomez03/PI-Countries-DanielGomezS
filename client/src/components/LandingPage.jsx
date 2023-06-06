import { Link } from 'react-router-dom';
import style from "../styles/LandingPage.module.css";
import backgroundImage from "../assets/globe-world-close-up-earth-old-world-globe-491574-pxhere.com.jpg";

const LandingPage = () => {
  return (
    <div className={style.landing_page}>
      <div className={style.background_image} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={style.content}>
          <h1 className={style.title}>Bienvenido a mi proyecto</h1>
          <Link to="/home">
            <button className={style.button_home}>Ingresar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;