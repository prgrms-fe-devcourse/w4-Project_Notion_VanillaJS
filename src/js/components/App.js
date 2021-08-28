import PostPage from "./SideBar/PostPage.js";
import PostEditPage from "./PostMain/PostEditPage.js";

export default function App({ $target }) {
  const postPage = new PostPage({
    $target,
    onClick: (id) => {
      alert(id);
    },
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
    },
  });

  postEditPage.render();
}
