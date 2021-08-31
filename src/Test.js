//   console.log($target);
//   const $list = document.createElement("div");
//   $target.appendChild($list);
//   //초기생성
//   const documentPage = {
//     title: "하위 문서1",
//     parent: 1510,
//   };
//   this.state = {};
//   this.setState = (nextState) => {
//     this.state = nextState;
//     this.render();
//   };
//   const createPost = request("/documents", {
//     method: "POST",
//     body: JSON.stringify(documentPage),
//   });

//   const fetch = async () => {
//     const title = await request("/documents");
//     console.log(title);
//     this.setState(title);
//   };
//   this.render = () => {
//     $list.innerHTML = `
//     <ul>
//     ${this.state
//       .map(
//         ({ title, document }) =>
//           `<li>${title}</li>  ${document?.map(
//             ({ title2 }) => `<div>${title2}</div>`
//           )}`
//       )
//       .join("")}
//     </ul>
//     `;
//   };
//   fetch();
