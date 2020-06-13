import axios from "axios";
import { getPath } from "../utils/getPath";

export const getMovies = async (data, done) => {
  console.log(data);
  await axios
    .post(getPath("/movies/getmovies"), data)
    .then((res) => {
      done(res.data);
    })
    .catch((err) => {
      return done(err.response.data);
    });
};
