import { getDocumentById } from "./api.js";

const storage = window.localStorage;

export const setItem = (key, value) => {
  storage.setItem(key, value);
};

export const getItem = (key, defaultValue) => {
  try {
    const result = storage.getItem(key);
    return result || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const removeChildStorage = async (id) => {
  const targetDocument = await getDocumentById(id);
  const childDocuemnts = targetDocument.documents;
  childDocuemnts.forEach((document) => {
    storage.removeItem(document.id);
  });
};
