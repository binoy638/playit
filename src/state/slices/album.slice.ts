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

          state.id = id;
          state.name = name;
          state.total_tracks = total_tracks;
          state.release_date = release_date;
          state.image = image;
          state.type = type;
          state.tracks = tracks;
          state.loading = false;
          state.error = false;
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
