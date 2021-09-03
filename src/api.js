export const API_END_POINT = "https://kdt.roto.codes";
export const X_USER_NAME = "limkhl";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USER_NAME,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
};
