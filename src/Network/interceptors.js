import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://nutrifast-data.up.railway.app",
});