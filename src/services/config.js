import axios from "axios";

const baseURL = "https://swapi.dev/api/";

export const defaultAxiosInstance = axios.create({
  baseURL: baseURL,
});
