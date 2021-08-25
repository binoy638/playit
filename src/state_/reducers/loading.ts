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
  SHOW_ALBUM_PAGE,
  HIDE_ALBUM_PAGE,
} from "../actions/types";

const initialStore = {
  AppLoading: true,
  PlayerLoading: true,
  TrackLoading: true,
  SearchLoading: true,
  ArtistLoading: false,
  AlbumLoading: false,
};

const LoadingReducer = (state = initialStore, action: any) => {
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
      return { ...state, ArtistLoading: false };
    case HIDE_ARTIST_PAGE:
      return { ...state, ArtistLoading: true };
    case SHOW_ALBUM_PAGE:
      return { ...state, AlbumLoading: false };
    case HIDE_ALBUM_PAGE:
      return { ...state, AlbumLoading: true };
    default:
      return { ...state };
  }
};

export default LoadingReducer;
