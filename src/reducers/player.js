import {
  SET_PLAYLIST,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  LOOP,
} from "../actions/types";
import Playlist from "../helper/playlist";

const inititalStore = {
  playlist: new Playlist(),
  current: null,
  loop: false,
};

const playerReducer = (state = inititalStore, action) => {
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
    default:
      return { ...state };
  }
};

export default playerReducer;
