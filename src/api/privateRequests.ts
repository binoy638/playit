import { API } from "./config";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const fetchPlaylistsRequest = () => API.get(`/playlist`);

export const uploadProfileImage = (base64) =>
  API.post("/user/image", { base64 });

export const findUser = (query, cancelToken) =>
  API.get(`/search/user?query=${query}`, {
    cancelToken: cancelToken.token,
  });

export const addFriend = (userID) => API.post("/user/addfriend", userID);

export const removeFriend = (userID) => API.post("/user/removefriend", userID);

export const acceptFriendReq = (userID) =>
  API.post("/user/acceptfriendrequest", userID);

export const declineFriendReq = (userID) =>
  API.post("/user/rejectfriendrequest", userID);

export const removeFriendReq = (userID) =>
  API.post("/user/removefriendrequest", userID);

export const fetchFriends = () => API.get("/user/friends");
