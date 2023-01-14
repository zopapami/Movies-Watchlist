module.exports = mongoose => {
  const Movie = mongoose.model(
    "movie",
    mongoose.Schema(
      {
        title: String,
        year: Number,
        watched: Boolean
      },
      { timestamps: true }
    )
  );
  return Movie;
};
