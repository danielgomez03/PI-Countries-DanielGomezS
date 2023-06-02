import React, { useState } from "react";
import style from "../styles/SearchBar.module.css"
import lupa from "../assets/lupa.png"


const SearchBar = ({onSearch}) => {

   const [id, setId] = useState("");

   const handleEnter = (event) => {
      if (event.key === 'Enter') {
         onSearch(id);
         setId("")
      }
   }

   const handleChange = (event) => {
      setId(event.target.value);
   };

   return (
      <div className={style.searchBar}>
         <input onChange={handleChange} onKeyUp={handleEnter} type='search' className={style.input} placeholder="Look for a Character"/>
            <button onClick={()=>onSearch(id)} className={style.btnInput}>
            <img src={lupa} className={style.lupa} alt={"paila"} />
            </button>
      </div>
   );
}



export default SearchBar;