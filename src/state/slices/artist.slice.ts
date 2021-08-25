import { createSlice } from "@reduxjs/toolkit";
import { fetchArtistById } from "../thunks/artist.thunk";
import { IArtistInfo } from "../types";

// Define the initial state using that type
const initialState: IArtistInfo = {
  artist: {
    id: "",
    name: "",
    type: "",
    images: [{}],
    popularity: "",
    genres: [],
  },
  albums: [],
  tracks: [],
  loading: true,
  error: false,
};

const artistSlice = createSlice({
  name: "artist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        if (action.payload) {
          state.artist = action.payload.artist;
          state.albums = action.payload.albums;
          state.tracks = action.payload.tracks;
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(fetchArtistById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default artistSlice.reducer;
