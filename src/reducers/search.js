import { SEARCH, SEARCH_BAR_FOCUS, SET_QUERY } from "../actions/types";

const initialStore = {
  query: "",
  searchResult: [],
  resultFound: false,
  isSearchFocused: false, //to check if user have clicked on the search bar
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
  if (action.type === SEARCH_BAR_FOCUS) {
    return { ...state, isSearchFocused: action.payload };
  }
  return { ...state };
};

export default SearchReducer;
