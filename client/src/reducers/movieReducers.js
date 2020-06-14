import { SELECTED_MOVIE } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  selected_movie: {},
  selected_time: "12PM",
  selected_date: "Today",
  selected_theatre: "A",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECTED_MOVIE:
      return {
        ...state,
        selected_movie: action.payload,
        selected_time: action.selected_time,
        selected_date: action.selected_date,
        selected_theatre: action.selected_theatre,
      };
    default:
      return state;
  }
}
