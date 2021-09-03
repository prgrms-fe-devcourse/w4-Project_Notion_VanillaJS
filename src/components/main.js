import App from "./App.js";
import Editor from "./Editor.js";
import { setItem, getItem } from "../utils/storage.js";

const $target = document.querySelector("#app");

// new App({
//   $target
// })

const TEMP_DOCUMENT_SAVE_KEY = "temp-document";

const tempDocument = getItem(TEMP_DOCUMENT_SAVE_KEY, {
  titile: "",
  content: "",
});

let timer = null;

new Editor({
  $target,
  initialState: tempDocument || {
    title: "",
    content: "",
  },
  onEditing: (document) => {
    if (timer !== null) {
      clearTimeout(tiemr);
    }

    timer = setTimeout(() => {
      setItem(TEMP_DOCUMENT_SAVE_KEY, {
        ...document,
        tempSaveData : new Date()
      })
    }, 1000);
  },
});
