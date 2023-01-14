const db = require("../models");
const Movie = db.movies;

// create and save a new Movie
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // create a Movie
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    watched: req.body.watched ? req.body.watched : false
  });
  // save Movie in the database
  movie
    .save(movie)
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the Movie." });
    });
};

// retrieve all Movies from the database
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Movie.find(condition)
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving movies." });
    });
};

// find a single Movie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Not found Movie with id=${id}` });
      } else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Movie with id=${id}` });
    });
};

// update a Movie by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot update Movie with id=${id}. Maybe Movie was not found!` });
      } else res.send({ message: "TMovie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({ message: `Error updating Movie with id=${id}` });
    });
};

// delete a Movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Movie.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!` });
      } else {
        res.send({ message: "Movie was deleted successfully!" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Could not delete Movie with id=${id}` });
    });
};

// delete all Movies from the database
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({ message: `${data.deletedCount} Movies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while removing all movies." });
    });
};

// Find all watched Movies
exports.findAllWatched = (req, res) => {
  Movie.find({ watched: true })
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving movies." });
    });
};
