/* eslint-disable no-unused-vars */
export const USER_KEY = "currentUser";

export function setCurrentUser(user) {
  try {
    if (user === undefined || user === null) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (_) {
    // ignore localStorage errors
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function removeCurrentUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (_) {
    // noop
  }
}
