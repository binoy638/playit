import { API } from "./config";

export const searchVideoIdRequest = (query) =>
  API.get(`/search/videoid?query=${query} (lyrics)`);

export const searchVideoIdRequest_ = (query) =>
  API.get(`/search/videoid?query=${query}`);

export const searchTracksRequest = (query, cancelToken) =>
  API.get(`/search/track?query=${query}`, {
    cancelToken: cancelToken.token,
  });

export const getNewReleasesRequest = () => API.get(`/new-release`);

export const getTopTracksRequest = () => API.get(`/top-tracks`);

export const getArtistRequest = (id) => API.get(`/artist/${id}`);

export const getArtistAlbumsRequest = (id, limit, offset, include_groups) =>
  API.get(
    `/artist-albums?id=${id}&limit=${limit}&offset=${offset}&include_groups=${include_groups}`
  );

export const getArtistTopTracksRequest = (id) =>
  API.get(`/artist-toptracks/${id}`);

export const getAlbumRequest = (id) => API.get(`/album/${id}`);

export const loginRequest = (credentials) =>
  API.post(`/auth/login`, credentials);

export const registerRequest = (formData) =>
  API.post(`/auth/register`, formData);
