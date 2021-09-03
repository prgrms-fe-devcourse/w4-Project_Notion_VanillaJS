import App from "./App.js";

const $target = document.querySelector("#app");

// 더미 데이터
const data = [
  {
    id: 1,
    title: "노션을 만들자",
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

new App({
  $target,
  initialState: data,
});
