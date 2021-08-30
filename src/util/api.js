import { NOTION_API } from "./constant.js";

export const getAllData = async () => {
  try {
    const res = await fetch(`${NOTION_API}`, {
      headers: {
        "x-username": "jinn2u",
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
