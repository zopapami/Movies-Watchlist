import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieDataService from "../services/MovieService.js";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveMovies();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveMovies();
    setCurrentMovie(null);
    setCurrentIndex(-1);
  };

  const setActiveMovie = (movie, index) => {
    setCurrentMovie(movie);
    setCurrentIndex(index);
  };

  const removeAllMovies = () => {
    MovieDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    MovieDataService.findByTitle(searchTitle)
      .then(response => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Movies List</h4>

        <ul className="list-group">
          {movies &&
            movies.map((movie, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveMovie(movie, index)}
                key={index}
              >
                {movie.title}
              </li>
            ))}
        </ul>

        <button
          className="my-3 btn btn-sm btn-danger"
          onClick={removeAllMovies}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentMovie ? (
          <div>
            <h4>Movie</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentMovie.title}
            </div>
            <div>
              <label>
                <strong>Year:</strong>
              </label>{" "}
              {currentMovie.year}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentMovie.watched ? "Watched" : "Not watched"}
            </div>

            <Link
              to={"/movies/" + currentMovie.id}
              className="mt-2 p-2 badge text-bg-warning text-decoration-none"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
