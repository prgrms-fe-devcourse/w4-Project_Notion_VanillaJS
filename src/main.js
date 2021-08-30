import api from "./api.js";
import App from "./App.js";
import { LOCAL_STORAGE_KEY } from "./constants.js";
import { getItem } from "./storage.js";

const $target = document.querySelector("#app");
new App({
  $target,
  initialState: {
    documents: [],
    selectedDocument: {},
    toggledDocuments: getItem(LOCAL_STORAGE_KEY.TOGGLED_DOCUMENTS, {}),
    favoriteDocuments: getItem(LOCAL_STORAGE_KEY.FAVORITE_DOCUMENTS, {}),
  },
});

// console.log(await api.getRootDocuments());
// console.log(await api.createDocument({ title: "2" }));
// console.log(await api.getDocumentContentById(290));
// console.log(await api.deleteDocumentById(289));
// console.log(
//   await api.updateDocumentContentById(290, {
//     title: "updateTitle",
//     content: "updateContent",
//   })
// );
