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

export const uploadProfileImage = (data) => API.post("/user/image", { data });
