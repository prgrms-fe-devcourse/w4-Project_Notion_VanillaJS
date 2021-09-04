import PostsPage from "./PostsPage.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "../router.js";
import { parseRes, request } from "../api.js";
import { getItem } from "../storage.js";

const defaultContent = new Map([
  ["Content", ""],
  ["Comment", ""],
  ["Assign", ""],
  ["State", ""],
  ["Property", ""],
  ["Updated", new Date()],
  ["Due Date", ""],
]);

export default function App({ $target, mainPageId, refreshList }) {
  const postsPage = new PostsPage({
    $target,
    mainPageId,
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: { title: "", content: defaultContent, parent: null },
    },
    mainPageId,
    refreshPostList: (parentId) => {
      postsPage.refreshPostList(parentId);
      refreshList();
    },
  });

  this.route = async (btnType, id, parentId) => {
    if (btnType === "close") {
      document.querySelector("#postEditPage")
        ? document.querySelector("#postEditPage").remove()
        : null;
    }

    // 에디터가 열린 상태에서, 타 Post 에디터를 랜더링 할때, 기존 에디터 제거
    if (document.querySelector("#postEditPage")) {
      document.querySelector("#postEditPage")
        ? document.querySelector("#postEditPage").remove()
        : null;
    }

    mainPageId = getItem("mainPageId", false);

    const { pathname } = window.location;

    if (pathname === "/") {
      if (mainPageId != "initialPage") {
        const mainPageInfo = (
          await request(`/documents`, { method: "GET" })
        ).filter((list) => list.id == mainPageId)[0];

        postsPage.setState(mainPageInfo);
      }
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      let getPost = { title: "", content: defaultContent };
      if (btnType !== "new") {
        getPost = parseRes(
          await request(`/documents/${postId}`, { method: "GET" })
        );
      }
      if (postId != "initialPage") {
        postEditPage.setState({
          postId,
          btnType,
          parent: parentId || null,
          post: getPost,
        });
      }
    }
  };

  this.route();

  initRouter((btnType, id, parentId) => this.route(btnType, id, parentId));

  this.pageRender = (postListInfo) => {
    postsPage.pageRender(postListInfo);
  };
}
