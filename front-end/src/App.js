import React from "react";
import { Link, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMovie from "./components/AddMovie.js";
import Movie from "./components/Movie.js";
import MoviesList from "./components/MoviesList.js";

function App() {
  return (
    <div className="App">
      { /*--- NavBar ---*/ }
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/movies" className="navbar-brand">MW</a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/movies"} className="nav-link">Movies</Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">Add</Link>
          </li>
        </div>
      </nav>
      { /*--- Routes ---*/ }
      <div className="container mt-3">
          <Routes>
            <Route path="/" element={ <MoviesList/> } />
            <Route path="/movies" element={ <MoviesList/> } />
            <Route path="/add" element={ <AddMovie/> } />
            <Route path="/movies/:id" element={ <Movie/> } />
          </Routes>
      </div>
    </div>
  );
};

export default App;
