import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER,
  LOGOUT,
  SHOW_AUTH,
  AUTH_LOADING,
  CLEAR_ERROR,
  UPDATE_PROFILE_IMAGE,
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
    case UPDATE_PROFILE_IMAGE:
      const newImage = action.payload;
      const _user = JSON.parse(localStorage.getItem("user"));
      if (!_user) return { ...state };
      _user.image = newImage;
      localStorage.setItem("user", JSON.stringify(_user));
      return { ...state, user: _user };
    default:
      return { ...state };
  }
};

export default auth;
