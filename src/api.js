import { push } from "./router.js";

export const API_END_POINT = "https://kdt.roto.codes";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "Junhyeong-B",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 호출 오류");
  } catch (e) {
    console.log(e);
    push("/"); // NOTE url이 개발자가 의도한 url이 아닐 경우 Root Page로 이동.
  }
};
