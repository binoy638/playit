import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Playlist from "../../helper/playlist";
import { IPlayer, ITrack } from "../types";

// Define the initial state using that type
const initialState: IPlayer = {
  playlist: new Playlist(),
  current: null,
  loop: false,
  currentTime: 0,
  isPlaying: false,
  duration: 0,
  syncedWith: null,
  syncedTo: false,
  seekTime: null,
  loading: true,
};

const playerSlice = createSlice({
  name: "player",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPlaylist: (
      state,
      action: PayloadAction<{ tracks: ITrack[]; index: number }>
    ) => {
      const { tracks, index } = action.payload;
      const playlist = new Playlist(tracks, index);
      if (state.loop) {
        playlist.setLoop(true);
      }
      state.playlist = playlist;
      state.current = playlist.getCurrent();
    },
    setNextTrack: (state) => {
      state.playlist.nextTrack();
      state.current = state.playlist.getCurrent();
    },
    setPreviousTrack: (state) => {
      state.playlist.previousTrack();
      state.current = state.playlist.getCurrent();
    },
    setLoop: (state, action: PayloadAction<boolean>) => {
      state.playlist.setLoop(action.payload);
      state.loop = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setSyncedTo: (state, action: PayloadAction<boolean>) => {
      state.syncedTo = action.payload;
    },
    setSyncedWith: (state, action: PayloadAction<string>) => {
      state.syncedWith = action.payload;
    },
    setSeekTime: (state, action: PayloadAction<number>) => {
      state.seekTime = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setLoop,
  setNextTrack,
  setPlaylist,
  setPreviousTrack,
  setSeekTime,
  setSyncedTo,
  setSyncedWith,
  setLoading,
} = playerSlice.actions;

export default playerSlice.reducer;
