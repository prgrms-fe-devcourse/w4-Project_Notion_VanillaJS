export default function HomePage({ $target }) {
  const $homepage = document.createElement("div");
  $homepage.classList.add("home-page");

  this.template = `
  <div class="home-page__message">
    <h1>문서를 선택해 주세요.</h1>
  </div>
  `;

  this.render = () => {
    $homepage.innerHTML = this.template;
    $target.appendChild($homepage);
  };
}
