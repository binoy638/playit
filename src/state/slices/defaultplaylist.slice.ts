import { createSlice } from "@reduxjs/toolkit";
import { fetchDefaultPlaylist } from "../thunks/defaultplaylist.thunk";
import { IDefaultPlaylist } from "../types";

// Define the initial state using that type
const initialState: IDefaultPlaylist = {
  newRelease: [],
  hotTracks: [],
  loading: true,
  error: false,
};

const defaultPlaylistSlice = createSlice({
  name: "defaultPlaylist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefaultPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDefaultPlaylist.fulfilled, (state, action) => {
        if (action.payload) {
          state = {
            newRelease: action.payload.newRelease,
            hotTracks: action.payload.hotTracks,
            loading: false,
            error: false,
          };
        }
      })
      .addCase(fetchDefaultPlaylist.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default defaultPlaylistSlice.reducer;
