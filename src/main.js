import App from "./App.js";
const $app = document.querySelector("#app");
const initialState = [
  {
    id: 1, // Document id
    title: "deps 1단계", // Document title
    documents: [
      {
        id: 2,
        title: "deps 2단계",
        documents: [
          {
            id: 3,
            title: "deps 3단계",
            documents: [
              {
                id: 4,
                title: "deps 4단계",
                documents: [{ id: 9, title: "deps 5단계", documents: [] }],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: "deps 2단계",
        documents: [],
      },
      {
        id: 6,
        title: "deps 2단계",
        documents: [
          {
            id: 7,
            title: "deps 3단계",
            documents: [
              {
                id: 8,
                title: "deps 4단계",
                documents: [{ id: 10, title: "deps 5단계", documents: [] }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 11,
    title: "deps 1단계",
    documents: [],
  },
];

new App({ $target: $app, initialState });
