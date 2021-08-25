import {
  SET_PLAYLIST,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  LOOP,
  SET_CURRENT_TIME,
  SET_DURATION,
  SET_IS_PLAYING,
  SET_PLAYER_SYNCEDTO,
  SET_PLAYER_SYNCEDWITH,
  SET_SEEK_TIME,
} from "../actions/types";
import Playlist from "../../helper/playlist";

const inititalStore = {
  playlist: new Playlist(),
  current: null,
  loop: false,
  currentTime: 0,
  isPlaying: false,
  durtation: 0,
  syncedWith: null,
  syncedTo: false,
  seekTime: null,
};

const playerReducer = (state = inititalStore, action: any) => {
  switch (action.type) {
    case SET_PLAYLIST:
      const { playlist: pl, index } = action.payload;
      const playlist = new Playlist(pl, index);
      if (state.loop) {
        playlist.setLoop(true);
      }
      return {
        ...state,
        playlist,
        current: playlist.getCurrent(),
      };
    case NEXT_TRACK:
      state.playlist.nextTrack();
      return { ...state, current: state.playlist.getCurrent() };
    case PREVIOUS_TRACK:
      state.playlist.previousTrack();
      return { ...state, current: state.playlist.getCurrent() };
    case LOOP:
      if (action.payload === true) {
        state.playlist.setLoop(true);
      } else {
        state.playlist.setLoop(false);
      }
      return { ...state, loop: action.payload };
    case SET_CURRENT_TIME:
      const currentTime = action.payload;
      return { ...state, currentTime };
    case SET_DURATION:
      const duration = action.payload;
      return { ...state, duration };
    case SET_IS_PLAYING:
      const isPlaying = action.payload;
      return { ...state, isPlaying };
    case SET_PLAYER_SYNCEDTO:
      return { ...state, syncedTo: action.payload };
    case SET_PLAYER_SYNCEDWITH:
      return { ...state, syncedWith: action.payload };
    case SET_SEEK_TIME:
      return { ...state, seekTime: action.payload };
    default:
      return { ...state };
  }
};

export default playerReducer;
