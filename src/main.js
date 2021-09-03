import App from "./component/App.js";
import Header from "./component/Header.js";
import SidePage from "./component/SidePage.js";
import { getItem, setItem } from "./storage.js";

const mainPageId = getItem("mainPageId", false) || "initialPage";
if (mainPageId == "initialPage") setItem("mainPageId", "initialPage");

const sidePage = new SidePage({
  $target: document.querySelector("#sideMenu"),
  mainPageId: mainPageId,
  onClick: (postListInfo) => {
    if (document.querySelector("#initialPage"))
      document.querySelector("#initialPage").remove();

    setItem("mainPageId", postListInfo.id);
    app.pageRender(postListInfo);
    header.setState({ id: postListInfo.id });
  },
});

const header = new Header({
  $target: document.querySelector("#header"),
  initialState: {
    id: mainPageId,
    title: "",
    content: "",
    parent: null,
  },
});

const app = new App({
  $target: document.querySelector("#app"),
  mainPageId: mainPageId,
  refreshList: () => {
    sidePage.refreshList();
  },
});
