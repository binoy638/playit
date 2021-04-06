import axios from "axios";
import {
  newReleaseURL,
  hotTracksURL,
  fetchVideoURL,
  searchTracksURL,
  ArtistInfoURL,
  ArtistAlbumsURL,
  ArtistTopTracksURL,
  AlbumURL,
} from "../api";
import { shuffle } from "../helper/shuffle";
import {
  FETCH_DEFAULT_PLAYLISTS,
  SET_CURRENT_TRACK,
  SEARCH,
  SET_QUERY,
  SHOW_APP,
  SHOW_SEARCH,
  HIDE_SEARCH,
  SHOW_PLAYER,
  SHOW_TRACK_LOADING,
  SET_PLAYLIST,
  CURRENT_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  LOOP,
  SEARCH_BAR_FOCUS,
  FETCH_ARTIST_INFO,
  HIDE_ARTIST_PAGE,
  SHOW_ARTIST_PAGE,
  FETCH_ALBUM,
  HIDE_ALBUM_PAGE,
  SHOW_ALBUM_PAGE,
} from "./types";

//Action Creator

export const fetchDefaultPlaylists = () => async (dispatch) => {
  const { data: newRelease } = await axios.get(newReleaseURL);
  const { data: hotTracks } = await axios.get(hotTracksURL);

  dispatch({
    type: FETCH_DEFAULT_PLAYLISTS,
    payload: {
      newRelease: shuffle(newRelease),
      hotTracks: shuffle(hotTracks),
    },
  });
  dispatch({ type: SHOW_APP });
};

export const fetchArtistInfo = (id) => async (dispatch) => {
  dispatch({
    type: HIDE_ARTIST_PAGE,
  });
  // const { data } = await axios.get(ArtistInfoURL(id));
  // const { data: albums } = await axios.get(ArtistAlbumsURL(id, 10, 0, "album"));

  let [{ data }, { data: albums }, { data: tracks }] = await Promise.all([
    axios.get(ArtistInfoURL(id)),
    axios.get(ArtistAlbumsURL(id, 10, 0, "album")),
    axios.get(ArtistTopTracksURL(id)),
  ]);

  if (data.statusCode === 500) {
    //TODO: SHOW NOT FOUND
    return;
  }

  dispatch({
    type: FETCH_ARTIST_INFO,
    payload: { info: data, albums, tracks },
  });
  dispatch({
    type: SHOW_ARTIST_PAGE,
  });
};

export const fetchAlbumInfo = (id) => async (dispatch) => {
  dispatch({
    type: HIDE_ALBUM_PAGE,
  });

  let { data } = await axios.get(AlbumURL(id));
  if (data.statusCode === 500) {
    //TODO: SHOW NOT FOUND
    return;
  }
  dispatch({
    type: FETCH_ALBUM,
    payload: data,
  });
  dispatch({
    type: SHOW_ALBUM_PAGE,
  });
};

export const setCurrentTrack = (payload) => async (dispatch) => {
  dispatch({ type: SHOW_TRACK_LOADING });
  console.log("fetching video id");
  const response = await axios.get(fetchVideoURL(payload.search_query));
  const videoid = response.data.id;
  dispatch({
    type: SET_CURRENT_TRACK,
    payload: { ...payload, videoid },
  });

  dispatch({ type: SHOW_PLAYER });
};

export const search = (query, cancelToken) => async (dispatch) => {
  dispatch({ type: HIDE_SEARCH }); //hide search loading spinner

  const response = await axios.get(searchTracksURL(query), {
    cancelToken: cancelToken.token,
  });
  let payload;
  if (response.data.statusCode === 404) {
    payload = { searchResult: [], resultFound: false };
  } else {
    payload = {
      searchResult: response.data,
      resultFound: true,
    };
  }
  dispatch({
    type: SEARCH,
    payload,
  });

  dispatch({ type: SHOW_SEARCH });
};

export const setQuery = (query) => (dispatch) => {
  dispatch({
    type: SET_QUERY,
    payload: { query },
  });
};

export const setPlaylist = (payload) => (dispatch) => {
  dispatch({
    type: SET_PLAYLIST,
    payload,
  });
};

export const currentTrack = () => (dispatch) => {
  dispatch({
    type: CURRENT_TRACK,
  });
};

export const nextTrack = () => (dispatch) => {
  dispatch({
    type: NEXT_TRACK,
  });
};

export const previousTrack = () => (dispatch) => {
  dispatch({
    type: PREVIOUS_TRACK,
  });
};

export const setLoop = (bool) => (dispatch) => {
  dispatch({
    type: LOOP,
    payload: bool,
  });
};

export const setSearchBarFocus = (bool) => (dispatch) => {
  dispatch({
    type: SEARCH_BAR_FOCUS,
    payload: bool,
  });
};
