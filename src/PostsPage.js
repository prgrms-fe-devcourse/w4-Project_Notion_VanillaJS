import { request } from "./api.js";
import LinkButton from "./LinkButton.js";
import PostList from "./PostList.js";
import { push } from "./router.js";

export default function PostsPage({ $target }) {
	const $page = document.createElement("div");
	const postList = new PostList({
		$target: $page,
		initialState: [],
	});

	new LinkButton({
		$target: $page,
		initialState: { text: "New Post", link: "/documents/new" },
	});

	const fetchPosts = async () => {
		const posts = await request("/documents");
		postList.setState(posts);
	};

	this.render = async () => {
		await fetchPosts();
		$target.appendChild($page);
	};
} //PostsPage
