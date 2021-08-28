import { request } from "../api.js";
import PostList from "./PostList.js";

// 사이드바를  담당하는 페이지
export default function PostPage({ $target, onClick }) {
  const $page = document.createElement("div");
  const DUMMY_DATA = [
    {
      id: 1, // Document id
      title: "노션을 만들자", // Document title
      documents: [
        {
          id: 2,
          title: "블라블라",
          documents: [
            {
              id: 3,
              title: "함냐함냐",
              documents: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "hello!",
      documents: [],
    },
  ];

  const postList = new PostList({
    $target: $page,
    initialState: DUMMY_DATA,
    onPostClick: (id) => {
      onClick(id);
    },
  });

  const $newPostButton = document.createElement("button");
  $page.appendChild($newPostButton);
  $newPostButton.textContent = "New Post";

  const fetchPosts = async () => {
    const posts = await request("/documents");
    // postList.setState(posts);
  };

  this.render = async () => {
    await fetchPosts();
    $target.appendChild($page);
  };

  this.render();

  fetchPosts();
}
