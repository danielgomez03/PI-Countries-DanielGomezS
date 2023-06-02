import React from "react";
import CountryCard from "./CountryCard";

const Home = ({onClose, countries, onSearch}) => {

   const [name, setName] = React.useState("");

   const handleEnter = (event) => {
      if (event.key === 'Enter') {
         onSearch(name);
         setName("")
      }
   }

   const handleChange = (event) => {
      setName(event.target.value);
   };

   
   return(

      <div>
         <h1>HOLA</h1>
         <div >
         <input onChange={handleChange} onKeyUp={handleEnter} type='search' placeholder="Look for a Country"/>
            <button onClick={()=>onSearch(name)}>
            </button>
         </div>
            <div>
            {countries && countries.map((country,index) => {
            return( 
               <CountryCard key={country.id} 
               id={country.id}
               name={country.name}
               continent={country.continent}
               capital={country.capital}
               subregion={country.subregion}
               area={country.area}
               image={country.image}
               population={country.population}
               onClose={(onClose)}/>
         )})}
            </div>

      </div>

   );
   }

export default Home;