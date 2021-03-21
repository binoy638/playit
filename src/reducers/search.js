import { SEARCH } from "../actions/types";

const initialStore = {
  searchResult: [],
  loading: true,
  resultFound: false,
};

const SearchReducer = (state = initialStore, action) => {
  if (action.type === SEARCH) {
    const { resultFound } = action.payload;
    if (resultFound) {
      const { searchResult } = action.payload;
      return { ...state, searchResult, loading: false, resultFound };
    } else {
      return { ...state, loading: false, resultFound: false };
    }
  }
  return { ...state };
};

export default SearchReducer;
