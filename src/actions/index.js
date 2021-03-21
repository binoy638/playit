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
  dispatch(setCurrentTrack(newRelease[0]));
};

export const setCurrentTrack = (payload) => async (dispatch) => {
  const response = await axios.get(fetchVideoURL(payload.search_query));
  const videoid = response.data.id;

  dispatch({
    type: SET_CURRENT_TRACK,
    payload: { ...payload, videoid },
  });
};

export const search = (query) => async (dispatch) => {
  const response = await axios.get(searchTracksURL(query));
  let payload;
  if (response.data.statusCode === 404) {
    payload = { searchResult: [], loading: false, resultFound: false };
  } else {
    payload = {
      searchResult: response.data,
      loading: false,
      resultFound: true,
    };
  }
  dispatch({
    type: SEARCH,
    payload,
  });
};

export const setQuery = (query) => (dispatch) => {
  dispatch({
    type: SET_QUERY,
    payload: { query },
  });
};
