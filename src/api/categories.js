import { axiosInstance } from "../Network/interceptors";

export function getCategories() {
  return axiosInstance.get("/Categories");
}
