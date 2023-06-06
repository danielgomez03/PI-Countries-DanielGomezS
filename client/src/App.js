import React from "react";
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addCountry, removeCountry } from "./redux/actions";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Detail from "./components/Detail";
import FormPage from "./components/FormPage";
import Nav from "./components/Nav";


function App() {

  const location = useLocation();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  
  async function onSearch(name) {
    try {
      const url = "http://localhost:3001/countries/name/" + name;
  
      const { data } = await axios(url);
      console.log(data);
      const country = countries?.find((e) => e.name === data.name);
  
      if (country) {
        alert("Already in the list");
      } else if (data.name !== undefined) {
        dispatch(addCountry(data)); 
      } else {
        alert("Country not found");
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  const onClose = (name) => {
    dispatch(removeCountry(name));
  };


  return (
    <div className="container">
      {location.pathname === "/" ? null : (
        <Nav/>
      )}
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home onSearch={onSearch} onClose={onClose} />} />
        <Route path="/Detail/:name" element={<Detail/>}/>
        <Route path="/Form" element={<FormPage/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
  </div>
  );
}

export default App;
