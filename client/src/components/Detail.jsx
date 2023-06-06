import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import styles from "../styles/Detail.module.css"; 

const Detail = () => {
   const { name } = useParams();
   const [country, setCountry] = useState({});

   useEffect(() => {
      axios(`http://localhost:3001/countries/name/${name}`).then(({ data }) => {
         if (data.name) {
            setCountry(data);
         } else {
            window.alert('No hay país con ese nombre');
         }
      });
      return () => setCountry({});
   }, [name]);
   console.log(country.activities)
   return (
      <div className={styles.detailContainer}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={country.image} alt={country.name} />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>Detalle</h1>
          <h2 className={styles.field}>ID: {country.id}</h2>
          <h2 className={styles.field}>Nombre: {country.name}</h2>
          <h2 className={styles.field}>Continente: {country.continent}</h2>
          <h2 className={styles.field}>Capital: {country.capital}</h2>
          <h2 className={styles.field}>Subregión: {country.subregion}</h2>
          <h2 className={styles.field}>Área: {country.area}</h2>
          <h2 className={styles.field}>Población: {country.population}</h2>
    
          {country.activities && country.activities.length > 0 && (
            <>
              <h2 className={styles.field}>Actividades:</h2>
              {country.activities.map((activity) => (
                <div key={activity.id}>
                  <h3 className={styles.activityName}>{activity.name}</h3>
                  <p className={styles.activityDetails}>
                    Dificultad: {activity.difficulty}
                    <br />
                    Duración: {activity.duration}
                    <br />
                    Temporada: {activity.season}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
};

export default Detail;