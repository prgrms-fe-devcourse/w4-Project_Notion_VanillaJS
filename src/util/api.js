import { NOTION_API } from "./constant.js";

export const getAllData = async (documentId = "", method = "GET") => {
  try {
    const res = await fetch(`${NOTION_API}/${documentId}`, {
      headers: {
        "x-username": "jinn2u",
        method,
      },
    });
    if (!res.ok) {
      return console.error("API is not ok");
    }
    return res.json();
  } catch (e) {
    console.error(e);
  }
};
