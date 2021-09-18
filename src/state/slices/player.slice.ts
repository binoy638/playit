import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer, ITrack } from "../types";

// Define the initial state using that type
const initialState: IPlayer = {
  playlist: [],
  current: null,
  currentIndex: 0,
  totalTracks: 0,
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

      state.playlist = tracks;
      state.current = tracks[index];
      state.currentIndex = index;
      state.totalTracks = tracks.length;
      state.loading = false;
    },

    setNextTrack: (state) => {
      if (state.currentIndex < state.totalTracks - 1) {
        state.currentIndex += 1;
        state.current = state.playlist[state.currentIndex];
      } else {
        state.currentIndex = 0;
        state.current = state.playlist[state.currentIndex];
      }
    },
    setPreviousTrack: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.current = state.playlist[state.currentIndex];
      } else {
        state.currentIndex = state.totalTracks - 1;
        state.current = state.playlist[state.currentIndex];
      }
    },
    setLoop: (state, action: PayloadAction<boolean>) => {
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
