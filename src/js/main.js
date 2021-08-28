import App from "./components/App.js";
import PostEditPage from "./components/PostMain/PostEditPage.js";
import PostList from "./components/SideBar/PostList.js";

const $app = document.querySelector("#app");

new App({
  $target: $app,
});
