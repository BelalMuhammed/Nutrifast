import { axiosInstance } from "../Network/interceptors";

export function getCategories() {
  return axiosInstance.get("/filters");
}

export function getCustomerFavorites() {
  return axiosInstance.get("/favoritesProduct ");
}
