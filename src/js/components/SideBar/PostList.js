export default function PostList({ $target, initialState, onPostClick }) {
  const $postList = document.createElement("div");

  $target.appendChild($postList);

  // 초기에는 [] 빈 값을 전달 받고,
  this.state = initialState;

  // PostPage가 렌더 될 때, 데이터를 받아서 업데이트를 해준다.
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.createTreeView = (data) => {
    let str = "";

    // 템플릿으로 빼서 사용하는게 좋지 않을까 생각 중.
    for (const key in data) {
      if (data[key].documents.length) {
        str += `<li data-id="${data[key].id}">${
          data[key].title
        }<ul>${this.createTreeView(data[key].documents)}</ul></li>`;
      } else {
        str += `<li data-id="${data[key].id}">${data[key].title}</li>`;
      }
    }

    return str;
  };

  this.render = () => {
    $postList.innerHTML = `
      <ul>
        ${this.state
          .map(
            (post) => `
            <li data-id="${post.id}">${post.title}</li>
            ${
              post.documents
                ? `<ul>${this.createTreeView(post.documents)}</ul>`
                : ""
            }
            `
          )
          .join("")}
      </ul>
    `;
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const { id } = e.target.dataset;
    onPostClick(parseInt(id));
  });
}
