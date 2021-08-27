import App from "./components/App.js";
import Editor from "./components/Editor.js";
import { setItem, getItem } from "./components/Storage.js";

const $app = document.querySelector("#app");

new App({
  $target: $app,
});

const TEMP_POST_SAVE_KEY = "temp-post";
const posts = getItem(TEMP_POST_SAVE_KEY, {
  title: "",
  content: "",
});

console.log(posts);

new Editor({
  $target: $app,
  initialState: posts,
  onEditing: (post) => {
    setItem(TEMP_POST_SAVE_KEY, {
      ...post,
      tempSaveDate: new Date(),
    });
  },
});
