import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMovie from "./components/AddMovie.js";
import Movie from "./components/Movie.js";
import MoviesList from "./components/MoviesList.js";

import MovieLogo from "./movie-icon.png";
import AddSign from "./add-icon.png";

function App() {
  return (
    <div className="App">
      {/*--- NavBar ---*/}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <Link to={"/"} className="navbar-brand ms-4">
            <img src={MovieLogo} alt="movie-icon" />
          </Link>
          <li className="nav-item">
            <Link to={"/movies"} className="nav-link">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              <img src={AddSign} alt="add-icon" />
            </Link>
          </li>
        </div>
      </nav>
      {/*--- Routes ---*/}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<h2>Welcome!</h2>} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/movies/:id" element={<Movie />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
