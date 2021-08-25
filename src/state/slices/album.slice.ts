import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbumById } from "../thunks/album.thunk";
import { IAlbumInfo } from "../types";

// Define the initial state using that type
const initialState: IAlbumInfo = {
  id: "",
  name: "",
  total_tracks: "",
  release_date: "",
  image: "",
  type: "",
  tracks: [],
  loading: true,
  error: false,
};

const albumSlice = createSlice({
  name: "album",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        if (action.payload) {
          const { id, name, total_tracks, release_date, image, type, tracks } =
            action.payload;
          state = {
            id,
            name,
            total_tracks,
            release_date,
            image,
            type,
            tracks,
            loading: false,
            error: false,
          };
        }
      })
      .addCase(fetchAlbumById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const { setExpression, setResult } = albumSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default albumSlice.reducer;
