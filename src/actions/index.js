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
} from "./types";

//Action Creator

export const fetchDefaultPlaylists = () => async (dispatch) => {
  const { data: newRelease } = await axios.get(newReleaseURL);
  const { data: hotTracks } = await axios.get(hotTracksURL);

  dispatch({
    type: FETCH_DEFAULT_PLAYLISTS,
    payload: {
      newRelease: shuffle(newRelease, 7),
      hotTracks: shuffle(hotTracks, 7),
    },
  });
  dispatch({ type: SHOW_APP });
};

export const setCurrentTrack = (payload) => async (dispatch) => {
  dispatch({ type: SHOW_TRACK_LOADING });
  const response = await axios.get(fetchVideoURL(payload.search_query));
  const videoid = response.data.id;
  console.log("fetching current");
  dispatch({
    type: SET_CURRENT_TRACK,
    payload: { ...payload, videoid },
  });

  dispatch({ type: SHOW_PLAYER });
};

export const search = (query) => async (dispatch) => {
  dispatch({ type: HIDE_SEARCH });

  const response = await axios.get(searchTracksURL(query));
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
