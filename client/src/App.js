import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Detail from "./components/Detail";
import FormPage from "./components/FormPage";


function App() {


  const [countries, setCountries] = React.useState([]);
  
  async function onSearch(name) {
    try {
      const url = "http://localhost:3001/countries/name/" + name;

      const { data } = await axios(url);
      console.log(data)
      const country = countries?.find((e) => e.name === data.name);

      if (country) {
        alert("Already in the list");
      } else if (data.name !== undefined) {
        setCountries((countries) => [...countries, data]);
      } else {
        alert("Country not found");
      }
    } catch (error) {
      return { error: error.message };
    }
  }


  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home onSearch={onSearch}  countries={countries}/>} />
        <Route path="/Detail/:name" element={<Detail/>}/>
        <Route path="/Form" element={<FormPage/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
  </div>
  );
}

export default App;
