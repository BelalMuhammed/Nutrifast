import { axiosInstance } from "../Network/interceptors";

export function getCategories() {
  return axiosInstance.get("/filters");
}

export function getCustomerFavorites() {
  return axiosInstance.get("/favoritesProduct ");
}

export function sendContactMessage(messageData) {
  return axiosInstance.post("/messages", messageData);
}

export function updateUserProfile(profileData) {
  // Use the user ID in the URL for PUT request
  return axiosInstance.put(`/users/${profileData.id}`, profileData);
}

export function updateUserProfileAlternative(profileData) {
  // Alternative: Try PATCH instead of PUT
  return axiosInstance.patch(`/users/${profileData.id}`, profileData);
}

export function createOrUpdateUserProfile(profileData) {
  // Alternative: Try POST to create/update
  return axiosInstance.post("/users", profileData);
}

export function getUserProfile(userId) {
  return axiosInstance.get(`/users/${userId}`);
}
