import axios from "axios";

export const baseURL = process.env.BASE_URL || "http://localhost:5001";
// export const baseURL = "https://playit-server.herokuapp.com/";

export const API = axios.create({ baseURL });
