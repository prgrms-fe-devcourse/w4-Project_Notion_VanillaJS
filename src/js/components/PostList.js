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

  // 그 값으로 새롭게 페이지를 구성
  this.render = () => {
    $postList.innerHTML = `
      <ul>
        ${this.state
          .map((post) => `<li data-id="${post.id}">${post.title}</li>`)
          .join("")}
      </ul>
    `;
  };

  this.render();
}
