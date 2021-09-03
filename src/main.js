import {
  getRootDocument,
  getContentDocument,
  postDocument,
  putDocument,
  deleteDocument,
} from "./api/request.js";

import App from "./App/App.js";

const doApp = async () => {
  const $target = document.querySelector("#app");
  const initialState = await getRootDocument();
  new App({ $target, initialState });
};

doApp();
