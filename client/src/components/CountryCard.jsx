import React from "react";
import { Link} from "react-router-dom";


const CountryCard = (props) => {

   const {id, name, image, continent, capital, subregion, area, population, activities, onClose} = props
   console.log(props)
   return (
      <div >
         <div >
            <div >
               <img src={image} alt={name} />
            </div>
            <div >
            <Link to={`/Detail/${props.name}`}>
               <h2>{name}</h2>
            </Link>
               <h2>{continent}</h2>
                <h2>{capital}</h2>
                <h2>{subregion}</h2>
                <h2>{area}</h2>
                <h2>{population}</h2>
                <h2>{activities}</h2>
                <button onClick={()=> onClose(name)}>X</button>
            </div>
         </div>
      </div>
   )
}



export default CountryCard;