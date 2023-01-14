import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MovieDataService from "../services/MovieService.js";

const Movie = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialMovieState = {
    id: null,
    title: "",
    year: null,
    watched: false
  };
  const [currentMovie, setCurrentMovie] = useState(initialMovieState);
  const [message, setMessage] = useState("");

  const getMovie = id => {
    MovieDataService.get(id)
      .then(response => {
        setCurrentMovie(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getMovie(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentMovie({ ...currentMovie, [name]: value });
  };

  const updateWatched = status => {
    var data = {
      id: currentMovie.id,
      title: currentMovie.title,
      year: currentMovie.year,
      watched: status
    };

    MovieDataService.update(currentMovie.id, data)
      .then(response => {
        setCurrentMovie({ ...currentMovie, watched: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateMovie = () => {
    MovieDataService.update(currentMovie.id, currentMovie)
      .then(response => {
        console.log(response.data);
        setMessage("The movie was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteMovie = () => {
    MovieDataService.remove(currentMovie.id)
      .then(response => {
        console.log(response.data);
        navigate("/movies");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentMovie ? (
        <div className="edit-form">
          <h4>Movie</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentMovie.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                className="form-control"
                id="year"
                name="year"
                value={currentMovie.year}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentMovie.watched ? "Watched" : "Not yet"}
            </div>
          </form>

          {currentMovie.watched ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateWatched(false)}
            >
              UnWatch
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateWatched(true)}
            >
              Watch
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteMovie}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateMovie}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Movie...</p>
        </div>
      )}
    </div>
  );
};

export default Movie;
