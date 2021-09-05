import { getDocumentById } from "./api.js";

const storage = window.sessionStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const result = storage.getItem(key);
    return result || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};
export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
export const removeChildStorage = async (id) => {
  const targetDocument = await getDocumentById(id);
  const childDocuemnts = targetDocument.documents;
  childDocuemnts.forEach((document) => {
    storage.removeItem(document.id);
  });
};
