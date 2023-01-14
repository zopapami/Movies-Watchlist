import http from "../http-common";

// retrieve all Movies
const getAll = () => {
  return http.get("/movies");
};
// retrieve a single Movie with id
const get = id => {
  return http.get(`/movies/${id}`);
};
// create a new movie
const create = data => {
  return http.post("/movies", data);
};
// update a Movie with id
const update = (id, data) => {
  return http.put(`/movies/${id}`, data);
};
// delete a Movie with id
const remove = id => {
  return http.delete(`/movies/${id}`);
};
// delete all Movies
const removeAll = () => {
  return http.delete(`/movies`);
};
// find movies by title
const findByTitle = title => {
  return http.get(`/movies?title=${title}`);
};

const MovieService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default MovieService;
