import { SET_LOADING } from "../actions/types";

const inititalStore = {
  loading: false,
  percent: 0,
  duration: 0,
};

const playerReducer = (state = inititalStore, action) => {
  if (action.type === SET_LOADING) {
    const { loading, percent, duration } = action.payload;

    return {
      ...state,
      loading,
      percent,
      duration,
    };
  }
  return { ...state };
};

export default playerReducer;
