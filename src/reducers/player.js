import {
  SET_PLAYLIST,
  CURRENT_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
} from "../actions/types";
import Playlist from "../helper/playlist";

const inititalStore = {
  playlist: new Playlist(),
  current: null,
  next: null,
  previous: null,
};

const playerReducer = (state = inititalStore, action) => {
  switch (action.type) {
    case SET_PLAYLIST:
      const { playlist: pl, index } = action.payload;
      const playlist = new Playlist(pl, index);
      return {
        ...state,
        playlist,
        current: playlist.getCurrent(),
        next: playlist.getNext(),
        previous: playlist.getPrevious(),
      };
    case CURRENT_TRACK:
      const current = state.playlist.getCurrent();
      return { ...state, current };
    case NEXT_TRACK:
      state.playlist.skipTrack();
      return { ...state, current: state.playlist.getCurrent() };
    case PREVIOUS_TRACK:
      state.playlist.previousTrack();
      return { ...state, current: state.playlist.getCurrent() };
    default:
      return { ...state };
  }
};

export default playerReducer;
