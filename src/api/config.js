import axios from "axios";

// export const baseURL = "https://fire-platinum-licorice.glitch.me/";
export const baseURL = "https://playit-server.herokuapp.com";
// export const baseURL = "http://localhost:5001";

export const API = axios.create({ baseURL });
