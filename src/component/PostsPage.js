import PostList from "./PostList.js";
import { request, removeChained } from "../api.js";
import { getItem } from "../storage.js";
import toast from "../toast.js";

export default function PostsPage({ $target, mainPageId }) {
  const $page = document.createElement("div");
  $page.setAttribute("id", "postPage");

  const postList = new PostList({
    $target: $page,
    initialState: [],
    mainPageId,
    onRemove: async (removeInfo) => {
      const removeObject = await request(`/documents/${removeInfo.targetId}`, {
        method: "GET",
      });

      removeChained(removeObject, true);

      toast("Removed");
    },
  });

  this.setState = async (postListInfo) => {
    const posts = postListInfo;
    postList.setState(posts.documents, posts.id);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };

  this.refreshPostList = async () => {
    const pageList = await request("/documents");
    const savedMainPageId = getItem("mainPageId", false);
    const posts = savedMainPageId
      ? pageList.filter((list) => list.id == savedMainPageId)[0]
      : pageList[1];

    postList.setState(posts.documents, posts.id);
  };

  this.pageRender = (postListInfo) => {
    this.setState(postListInfo);
  };
}
