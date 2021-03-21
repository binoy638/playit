import { FETCH_DEFAULT_PLAYLISTS } from "../actions/types";

const initialStore = {
  newRelease: [],
  hotTracks: [],
  loading: true,
};

const DefaultPlaylistReducer = (state = initialStore, action) => {
  switch (action.type) {
    case FETCH_DEFAULT_PLAYLISTS:
      const { newRelease, hotTracks } = action.payload;

      return { ...state, newRelease, hotTracks, loading: false };
    default:
      return { ...state };
  }
};

export default DefaultPlaylistReducer;
