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
  SET_CURRENT_TIME,
  LOGOUT,
  SET_DURATION,
  SET_IS_PLAYING,
  SET_IS_CONNECTED,
  SET_SOCKET,
  SET_PLAYER_SYNC,
  SHOW_AUTH,
  AUTH_LOADING,
  UPDATE_PROFILE_IMAGE,
  SET_FIND_USER_RESULT,
  SET_FRIEND_LIST,
  SET_ADD_FRIEND_ERROR,
} from "./types";
// import jwt_decode from "jwt-decode";
import * as API from "../api/publicRequests";
import * as APIV2 from "../api/privateRequests";
import { FriendCard } from "../components/extra/cards";
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

  try {
    const { data } = await API.searchTracksRequest(query, cancelToken);

    if (data.length) {
      dispatch({
        type: SEARCH,
        payload: {
          searchResult: data,
          resultFound: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: SEARCH,
      payload: {
        searchResult: [],
        resultFound: false,
      },
    });
  }
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

export const login = (credentials) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
    payload: true,
  });
  try {
    const { data } = await API.loginRequest(credentials);
    const { token, username, email, image, friends } = data;
    if (token) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: { username, email, token, image }, friends },
      });
      dispatch(setShowAuth(null));
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

export const logout = (router) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  router.push("/");
};

export const setCurrentTime = (time) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_TIME,
    payload: time,
  });
};

export const setDuration = (time) => (dispatch) => {
  dispatch({
    type: SET_DURATION,
    payload: time,
  });
};

export const setisPlaying = (bool) => (dispatch) => {
  dispatch({
    type: SET_IS_PLAYING,
    payload: bool,
  });
};

export const setConnected = (bool) => (dispatch) => {
  console.log("inside connected", bool);
  dispatch({
    type: SET_IS_CONNECTED,
    payload: bool,
  });
};

export const setRoomID = (ID) => (dispatch) => {
  dispatch({
    type: SET_IS_CONNECTED,
    payload: ID,
  });
};

export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    payload: socket,
  });
};

export const setPlayerRef = (bool) => (dispatch) => {
  dispatch({
    type: SET_PLAYER_SYNC,
    payload: bool,
  });
};

export const setShowAuth = (type) => (dispatch) => {
  dispatch({
    type: SHOW_AUTH,
    payload: type,
  });
};

export const updateUserImage = (image) => (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE_IMAGE,
    payload: image,
  });
};

export const searchFriend = (query, cancelToken) => async (dispatch) => {
  try {
    const { data } = await APIV2.findUser(query, cancelToken);

    dispatch({
      type: SET_FIND_USER_RESULT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_FIND_USER_RESULT,
      payload: null,
    });
  }
};

export const addFriend = (userID) => async (dispatch) => {
  try {
    const { data } = await APIV2.addFriend(userID);
    dispatch(fetchFriendList());
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data?.status) {
        const status = data.status;
        if (status === 2)
          return dispatch(addFriendError("This user have already added you."));
        else if (status === 3)
          return dispatch(addFriendError("You have already added this user."));
        else if (status === 4)
          return dispatch(
            addFriendError("This user is already in your friend list.")
          );
      }
    }
  }
};

export const addFriendError = (error) => async (dispatch) => {
  dispatch({
    type: SET_ADD_FRIEND_ERROR,
    payload: error,
  });
};

export const acceptFriendRequest = (userID) => async (dispatch) => {
  try {
    const { data } = await APIV2.acceptFriendReq(userID);
    dispatch(fetchFriendList());
  } catch (error) {
    console.log(error);
  }
};

export const declineFriendRequest = (userID) => async (dispatch) => {
  try {
    const { data } = await APIV2.declineFriendReq(userID);
    dispatch(fetchFriendList());
  } catch (error) {
    console.log(error);
  }
};

export const removePendingFriendRequest = (userID) => async (dispatch) => {
  try {
    const { data } = await APIV2.removeFriendReq(userID);
    dispatch(fetchFriendList());
  } catch (error) {
    console.log(error);
  }
};

export const fetchFriendList = () => async (dispatch) => {
  try {
    const { data } = await APIV2.fetchFriends();
    if (!data) return;

    const friends = [];
    const friendsReq = [];
    const friendsPen = [];

    data.friends.forEach((friend) => {
      if (friend.status === 4) return friends.push(friend);
      else if (friend.status === 2) return friendsReq.push(friend);
      else if (friend.status === 3) return friendsPen.push(friend);
    });
    dispatch({
      type: SET_FRIEND_LIST,
      payload: { friends, friendsPen, friendsReq },
    });
  } catch (error) {
    console.log(error);
  }
};
