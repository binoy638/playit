import { CancelTokenSource } from "axios";
import { ILogin, ISignup } from "../types";
import { API } from "./config";

export const searchVideoIdRequest = (query: string) =>
  API.get(`/search/videoid?query=${query} (lyrics)`);

export const searchVideoIdRequest_ = (query: string) =>
  API.get(`/search/videoid?query=${query}`);

export const searchTracksRequest = (
  query: string,
  cancelToken: CancelTokenSource
) =>
  API.get(`/search/track?query=${query}`, {
    cancelToken: cancelToken.token,
  });

export const getNewReleasesRequest = () => API.get(`/new-release`);

export const getTopTracksRequest = () => API.get(`/top-tracks`);

export const getArtistRequest = (id: string) => API.get(`/artist/${id}`);

export const getArtistAlbumsRequest = (
  id: string,
  limit: number,
  offset: number,
  include_groups: string
) =>
  API.get(
    `/artist-albums?id=${id}&limit=${limit}&offset=${offset}&include_groups=${include_groups}`
  );

export const getArtistTopTracksRequest = (id: string) =>
  API.get(`/artist-toptracks/${id}`);

export const getAlbumRequest = (id: string) => API.get(`/album/${id}`);

export const loginRequest = (credentials: ILogin) =>
  API.post(`/auth/login`, credentials);

export const registerRequest = (formData: ISignup) =>
  API.post(`/auth/register`, formData);
