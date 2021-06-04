import axios from "axios";

// const BASE_URL = "https://playit.sytes.net";
// const BASE_URL = "https://playit-server.herokuapp.com";
export const baseURL = "http://localhost:7789";

export const API = axios.create({ baseURL });
