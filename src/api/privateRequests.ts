import { CancelTokenSource } from "axios";
import { API } from "./config";

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const fetchPlaylistsRequest = () => API.get(`/playlist`);

export const uploadProfileImage = (base64: string | ArrayBuffer) =>
  API.post("/user/image", { base64 });

export const findUser = (query: string, cancelToken: CancelTokenSource) =>
  API.get(`/search/user?query=${query}`, {
    cancelToken: cancelToken.token,
  });

export const addFriend = (userID: string) =>
  API.post("/user/addfriend", userID);

export const removeFriend = (userID: string) =>
  API.post("/user/removefriend", userID);

export const acceptFriendReq = (userID: string) =>
  API.post("/user/acceptfriendrequest", userID);

export const declineFriendReq = (userID: string) =>
  API.post("/user/rejectfriendrequest", userID);

export const removeFriendReq = (userID: string) =>
  API.post("/user/removefriendrequest", userID);

export const fetchFriends = () => API.get("/user/friends");
