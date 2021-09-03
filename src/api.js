export const API_END_POINT = "https://kdt.roto.codes";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: { "x-username": "Yongrok", "Content-Type": "application/json" },
    });

    if (res.ok) {
      const result = await res.json();
      return result;
    }

    throw new Error("API Error");
  } catch (e) {
    console.log(e.message);
  }
};

export const stringifyBody = (bodyObj) => {
  bodyObj.content = JSON.stringify(Array.from(bodyObj.content));
  return JSON.stringify(bodyObj);
};

export const parseRes = (resStr) => {
  const parsedContent = resStr.content
    ? new Map(JSON.parse(resStr.content))
    : new Map();
  resStr.content = parsedContent;
  return resStr;
};

const searchChained = (topObject) => {
  let resultArr = [];
  topObject.documents.forEach((target) => {
    if (target.documents.length > 0) {
      const subResultArr = searchChained(target);
      resultArr = resultArr.concat(subResultArr);
    }
    resultArr.push(target.id);
  });

  return resultArr;
};

export const removeChained = async (topObject, nodeRemove) => {
  const targetArray = searchChained(topObject);
  targetArray.push(topObject.id);
  for (const target of targetArray) {
    const result = await request(`/documents/${target}`, {
      method: "DELETE",
    });
    if (nodeRemove) {
      document.querySelector(`#post${target}.post`).remove();
    }
  }
};
