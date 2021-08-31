import { NOTION_API, HTTP_METHOD, API_HEADER } from "./constant.js";

export const request = async (documentId = null, method = HTTP_METHOD.GET, data = {}) => {
  let options = {};
  options.headers = API_HEADER;
  options.method = method;
  if (method === HTTP_METHOD.POST || method === HTTP_METHOD.PUT) {
    options.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(`${NOTION_API}/${documentId ? documentId : ""}`, options);
    if (!res.ok) {
      return console.error("API is not ok");
    }
    return res.json();
  } catch (e) {
    console.error(e);
  }
};
