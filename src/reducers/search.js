import { SEARCH, SET_QUERY } from "../actions/types";

const initialStore = {
  query: "",
  searchResult: [],
  resultFound: false,
};

const SearchReducer = (state = initialStore, action) => {
  if (action.type === SEARCH) {
    const { resultFound } = action.payload;
    if (resultFound) {
      const { searchResult } = action.payload;
      return { ...state, searchResult, resultFound };
    } else {
      return { ...state, resultFound: false };
    }
  }
  if (action.type === SET_QUERY) {
    const { query } = action.payload;
    return { ...state, query };
  }
  return { ...state };
};

export default SearchReducer;
