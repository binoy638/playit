import {
  SHOW_APP,
  HIDE_APP,
  SHOW_PLAYER,
  HIDE_PLAYER,
  SHOW_SEARCH,
  HIDE_SEARCH,
  SHOW_TRACK_LOADING,
  HIDE_TRACK_LOADING,
  SHOW_ARTIST_PAGE,
  HIDE_ARTIST_PAGE,
} from "../actions/types";

const initialStore = {
  AppLoading: true,
  PlayerLoading: true,
  TrackLoading: true,
  SearchLoading: true,
  ArtistLoading: false,
};

const LoadingReducer = (state = initialStore, action) => {
  switch (action.type) {
    case SHOW_APP:
      return { ...state, AppLoading: false };
    case HIDE_APP:
      return { ...state, AppLoading: true };
    case SHOW_PLAYER:
      return { ...state, PlayerLoading: false };
    case HIDE_PLAYER:
      return { ...state, PlayerLoading: true };
    case SHOW_TRACK_LOADING:
      return { ...state, TrackLoading: true };
    case HIDE_TRACK_LOADING:
      return { ...state, TrackLoading: false };
    case SHOW_SEARCH:
      return { ...state, SearchLoading: false };
    case HIDE_SEARCH:
      return { ...state, SearchLoading: true };
    case SHOW_ARTIST_PAGE:
      console.log("inside show artist");
      return { ...state, ArtistLoading: false };
    case HIDE_ARTIST_PAGE:
      console.log("inside hide artist");
      return { ...state, ArtistLoading: true };
    default:
      return { ...state };
  }
};

export default LoadingReducer;
