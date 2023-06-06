import React from "react";
import { Link} from "react-router-dom";
import style from "../styles/CountryCard.module.css"

const CountryCard = (props) => {

   const { name, image, onClose} = props
   console.log(props)
   return (
      <div className={style.container} >
         <div className={style.cardContainer}>
            <div className={style.front}>
            <button className={style.btn} onClick={()=> onClose(name)}>X</button>
               <img src={image} alt={name} className={style.img}/>
               <Link to={`/Detail/${props.name}`}>
               <h2>{name}</h2>
               </Link>
            </div>            
         </div>
      </div>
   )
}

export default CountryCard;