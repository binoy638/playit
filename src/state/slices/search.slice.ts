import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSearchResults } from "../thunks/search.thunk";
import { ISearch } from "../types";

// Define the initial state using that type
const initialState: ISearch = {
  query: "",
  searchResult: [],
  resultFound: false,
  isSearchFocused: false, //to check if user have clicked on the search bar
  loading: false,
};

const searchSlice = createSlice({
  name: "search",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchBarFocus: (state, action: PayloadAction<boolean>) => {
      state.isSearchFocused = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        if (action.payload) {
          state.searchResult = action.payload;
          state.loading = false;
          state.resultFound = true;
        }
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false;
        state.resultFound = false;
      });
  },
});

export default searchSlice.reducer;
