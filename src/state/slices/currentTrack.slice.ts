import { createSlice } from "@reduxjs/toolkit";
import { changeVideoId, setCurrentTrack } from "../thunks/currrentTrack.thunk";

import { ICurrentTrack } from "../types";

// Define the initial state using that type
const initialState: ICurrentTrack = {
  id: "",
  title: "",
  artist: "",
  artists: [],
  type: "",
  image: "",
  search_query: "",
  videoid: null,
  loading: true,
  error: false,
};

const currentTrackSlice = createSlice({
  name: "currentTrack",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentTrack.pending, (state) => {
        state.loading = true;
      })
      .addCase(setCurrentTrack.fulfilled, (state, action) => {
        if (action.payload) {
          const { id, title, artist, artists, type, image, search_query } =
            action.payload.track;

          state.id = id;
          state.title = title;
          state.artist = artist;
          state.artists = artists;
          state.type = type;
          state.image = image;
          state.search_query = search_query;
          state.videoid = action.payload.videoid;
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(setCurrentTrack.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(changeVideoId.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeVideoId.fulfilled, (state, action) => {
        if (action.payload) {
          state.videoid = action.payload;
        }
      })
      .addCase(changeVideoId.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default currentTrackSlice.reducer;
