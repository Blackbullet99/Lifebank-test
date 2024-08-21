import { defaultAxiosInstance } from "./config";

export const getFilmList = async () => {
  return await defaultAxiosInstance.get("/films/");
};
