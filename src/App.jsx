import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Tv from "./components/Tv/Tv";
import Movies from "./components/Movies/Movies";
import Gallery from "./components/Gallery/Gallery";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./index.css";



class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Routes>
            <Route path="/home" element={<Home/>} ></Route>
            <Route path="/tv" element={<Tv/>} ></Route>
            <Route path="/movies" element={<Movies/>} ></Route>
            <Route path="/gallery" element={<Gallery/>} ></Route>
            <Route 
                path="/" 
                element = {<Navigate to="/home" />} />

            <Route path="*" element={<NotFound/>} ></Route>
            <Route path="/login" element={<Login/>} ></Route>
            <Route path="/register" element={<Register/>} ></Route>
            <Route path="/logout" element={<Login/>} ></Route>
        </Routes>
        
      </div>
    );
  }
}

export default App;
