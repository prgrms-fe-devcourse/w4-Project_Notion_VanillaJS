import api from "./api.js";
import App from "./App.js";
import { LOCAL_STORAGE_KEY } from "./constants.js";
import { getItem } from "./storage.js";
import AutoCompleteTrie from "./Trie.js";

const $target = document.querySelector("#app");
new App({
  $target,
  initialState: {
    documents: [],
    flattedDocuments: [],
    selectedDocument: {},
    toggledDocuments: getItem(LOCAL_STORAGE_KEY.TOGGLED_DOCUMENTS, {}),
    favoriteDocuments: getItem(LOCAL_STORAGE_KEY.FAVORITE_DOCUMENTS, {}),
  },
});
