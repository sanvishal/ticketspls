import { SET_USER } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthed: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
