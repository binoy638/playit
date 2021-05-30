import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER,
  LOGOUT,
} from "../actions/types";

const initialStore = {
  authenticated: false,
  user: null,
  error: null,
};

const auth = (state = initialStore, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return { ...state, user, error: null, authenticated: true };
    case LOGIN_FAILURE:
      const error = action.payload;
      return { ...state, error, user: null, authenticated: false };
    case LOGOUT:
      localStorage.clear();
      return { ...state, error: null, user: null, authenticated: false };
    case SET_USER:
      return {
        ...state,
        error: null,
        user: action.payload,
        authenticated: true,
      };
    default:
      return { ...state };
  }
};

export default auth;
