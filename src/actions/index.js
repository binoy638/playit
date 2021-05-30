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
  FETCH_VIDEO_ID,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER,
  LOGOUT,
} from "./types";
import jwt_decode from "jwt-decode";
import * as API from "../api/publicRequests";
//Action Creator

export const fetchDefaultPlaylists = () => async (dispatch) => {
  // const { data: newRelease } = await axios.get(newReleaseURL);
  // const { data: hotTracks } = await axios.get(hotTracksURL);

  const { data: newRelease } = await API.getNewReleasesRequest();
  const { data: hotTracks } = await API.getTopTracksRequest();

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

  let [{ data }, { data: albums }, { data: tracks }] = await Promise.all([
    API.getArtistRequest(id),
    API.getArtistAlbumsRequest(id, 10, 0, "album"),
    API.getArtistTopTracksRequest(id),
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

  let { data } = await API.getAlbumRequest(id);
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
  const response = await API.searchVideoIdRequest(payload.search_query);

  const videoid = response.data.id;
  dispatch({
    type: SET_CURRENT_TRACK,
    payload: { ...payload, videoid },
  });

  dispatch({ type: SHOW_PLAYER });
};

export const setVideoID = (query) => async (dispatch) => {
  dispatch({ type: SHOW_TRACK_LOADING });
  const { data } = await API.searchVideoIdRequest_(query);

  dispatch({
    type: FETCH_VIDEO_ID,
    payload: data.id,
  });
  dispatch({ type: SHOW_PLAYER });
};

export const search = (query, cancelToken) => async (dispatch) => {
  dispatch({ type: HIDE_SEARCH }); //hide search loading spinner

  const response = await API.searchTracksRequest(query, cancelToken);
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

export const login = (credentials, router) => async (dispatch) => {
  try {
    const { data } = await API.loginRequest(credentials);
    const token = data?.token;
    if (token) {
      const decoded = jwt_decode(token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { username: decoded.username, email: decoded.email, token },
      });
      router.push("/");
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Something went wrong.",
      });
    }
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Something went wrong.",
      });
      return;
    }
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data,
    });
  }
};

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
