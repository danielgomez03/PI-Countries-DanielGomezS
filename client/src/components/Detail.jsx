import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

const Detail = () => {
   const {name}= useParams()
   const [country, setCountry] = useState({}) 

   useEffect(() => {
      axios(`http://localhost:3001/countries/name/${name}`).then(({ data }) => {
         if (data.name) {
            setCountry(data);
         } else {
            window.alert('No hay pais con ese nombre');
         }
      });
         return setCountry({});
   }, [name]);

   return (
      <div >
         <div >
            <img  src={country.image} alt={country.name} />
         </div>
         <div >
         <h1>Detail</h1>
         <h2>ID ||{country.id}</h2>
         <h2>NAME ||{country.name}</h2>
         <h2>STATUS ||{country.continent}</h2>
         <h2>SPECIES ||{country.capital}</h2>
         <h2>GENDER ||{country.subregion}</h2>
         <h2>ORIGIN ||{country.area}</h2>
         <h2>POPULATION ||{country.population}</h2>
         </div>

         

      </div>
      );
   };

export default Detail;