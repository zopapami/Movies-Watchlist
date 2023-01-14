module.exports = app => {
  const movies = require("../controllers/movie.controller.js");
  let router = require("express").Router();

  // create a new movie
  router.post("/", movies.create);
  // retrieve all Movies
  router.get("/", movies.findAll);
  // retrieve all watched Movies
  router.get("/watched", movies.findAllWatched);
  // retrieve a single Movie with id
  router.get("/:id", movies.findOne);
  // update a Movie with id
  router.put("/:id", movies.update);
  // delete a Movie with id
  router.delete("/:id", movies.delete);
  // delete all Movies
  router.delete("/", movies.deleteAll);

  app.use('/api/movies', router);
};
