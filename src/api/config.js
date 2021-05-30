import axios from "axios";

// const baseURL = "https://playit.sytes.net";
const baseURL = "https://playit-server.herokuapp.com";
// const baseURL = "http://localhost:5000";

export const API = axios.create({ baseURL });
