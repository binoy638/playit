// const BASE_URL =  "http://localhost:5000"
const BASE_URL = "https://playit-server.herokuapp.com";

export const newReleaseURL = `${BASE_URL}/new-release`;
export const hotTracksURL = `${BASE_URL}/top-tracks`;
export const fetchVideoURL = (query) =>
  `${BASE_URL}/videoid?query=${query} (lyrics)`;
export const searchTracksURL = (query) => `${BASE_URL}/search?query=${query}`;
