import axios from "axios";
import { getPath } from "../utils/getPath";
import { SELECTED_MOVIE } from "./types";
import isEmpty from "is-empty";

export const getMovies = async (data, done) => {
  await axios
    .post(getPath("/movies/getmovies"), data)
    .then((res) => {
      done(res.data);
    })
    .catch((err) => {
      return done(err.response.data);
    });
};

export const selectShow = (movie, date, time, theatre) => (dispatch) => {
  if (!isEmpty(movie)) {
    dispatch({
      type: SELECTED_MOVIE,
      payload: movie,
      selected_date: date,
      selected_time: time,
      selected_theatre: theatre,
    });
  }
};
