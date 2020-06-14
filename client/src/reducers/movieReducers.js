import { SELECTED_MOVIE, BOOK_TICKET } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  selected_movie: {},
  selected_time: "12PM",
  selected_date: "Today",
  selected_theatre: "A",
  booked_ticket: {},
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

    case BOOK_TICKET:
      return {
        ...state,
        booked_ticket: action.payload,
      };
    default:
      return state;
  }
}
