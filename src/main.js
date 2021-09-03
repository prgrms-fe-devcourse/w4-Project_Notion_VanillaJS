import PostList from "./PostList.js";

const DUMMY_DATA = [
	{
		id: 1,
		title: "test1",
	},
	{
		id: 2,
		title: "test2",
	},
	{
		id: 3,
		title: "test3",
	},
	{
		id: 4,
		title: "test4",
	},
];

const $target = document.querySelector("#app");

new PostList({
	$target: $target,
	initialState: DUMMY_DATA,
});
