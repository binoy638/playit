import axios from "axios";

// const BASE_URL = "https://playit.sytes.net";
// const BASE_URL = "https://playit-server.herokuapp.com";
const baseURL = "http://localhost:5000";

export const API = axios.create({ baseURL });
