import { FETCH_DEFAULT_PLAYLISTS } from "../actions/types";

const initialStore = {
  newRelease: [],
  hotTracks: [],
};

const DefaultPlaylistReducer = (state = initialStore, action: any) => {
  switch (action.type) {
    case FETCH_DEFAULT_PLAYLISTS:
      const { newRelease, hotTracks } = action.payload;
      return { ...state, newRelease, hotTracks };
    default:
      return { ...state };
  }
};

export default DefaultPlaylistReducer;
