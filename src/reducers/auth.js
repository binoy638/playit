import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER,
  LOGOUT,
  SHOW_AUTH,
  AUTH_LOADING,
  CLEAR_ERROR,
} from "../actions/types";

const initialStore = {
  authenticated: false,
  user: null,
  showAuthType: null,
  loading: false,
  error: null,
};

const auth = (state = initialStore, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user,
        error: null,
        authenticated: true,
        loading: false,
      };
    case LOGIN_FAILURE:
      const error = action.payload;
      return {
        ...state,
        error,
        user: null,
        authenticated: false,
        loading: false,
      };
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
    case SHOW_AUTH:
      return { ...state, showAuthType: action.payload };
    case AUTH_LOADING:
      return { ...state, loading: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return { ...state };
  }
};

export default auth;
