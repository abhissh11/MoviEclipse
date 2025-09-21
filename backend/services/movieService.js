import Movie from "../models/Movie.js";

export const createMovie = async ({ title, description, added_by }) => {
  return Movie.create({ title, description, added_by });
};

export const deleteAllMovies = async () => {
  return Movie.deleteMany({});
};
