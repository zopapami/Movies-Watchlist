import React, { useState } from "react";
import MovieDataService from "../services/MovieService.js";

const AddMovie = () => {
  const initialMovieState = {
    id: null,
    title: "",
    year: null,
    watched: false
  };
  const [movie, setMovie] = useState(initialMovieState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const saveMovie = () => {
    var data = {
      title: movie.title,
      year: movie.year
    };

    MovieDataService.create(data)
      .then(response => {
        setMovie({
          id: response.data.id,
          title: response.data.title,
          year: response.data.year,
          watched: response.data.watched
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newMovie = () => {
    setMovie(initialMovieState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newMovie}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={movie.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              className="form-control"
              id="year"
              required
              value={movie.year}
              onChange={handleInputChange}
              name="year"
            />
          </div>

          <button onClick={saveMovie} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddMovie;
