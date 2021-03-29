import axios from "axios";
import {
  newReleaseURL,
  hotTracksURL,
  fetchVideoURL,
  searchTracksURL,
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

export const setCurrentTrack = (payload) => async (dispatch) => {
  dispatch({ type: SHOW_TRACK_LOADING });
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
