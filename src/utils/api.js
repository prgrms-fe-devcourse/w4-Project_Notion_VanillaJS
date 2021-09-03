import { API_END_POINT } from "./constant.js";

export const request = async (url, options = {}) => {
  const res = await fetch(`${API_END_POINT}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-username": "muntari",
    },
  });

  if (res.ok) {
    return await res.json();
  }
  throw new Error("API_Request_Error");
};
