import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "./slices/album.slice";
import artistSlice from "./slices/artist.slice";
import currentTrackSlice from "./slices/currentTrack.slice";
import defaultplaylistSlice from "./slices/defaultplaylist.slice";
// ...
const store = configureStore({
  reducer: {
    album: albumSlice,
    artist: artistSlice,
    currentTrack: currentTrackSlice,
    defaultPlaylist: defaultplaylistSlice,
  },
});
// export type RootState = ReturnType<typeof store.getState>;

// export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
