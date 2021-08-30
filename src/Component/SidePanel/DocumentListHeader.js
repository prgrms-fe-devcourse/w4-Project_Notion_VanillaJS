export default function DocumentListHeader({ $target, onCreate }) {
  const $header = document.createElement("div");
  $header.className = "document-list-container__header";
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <h2 class="document-list-container__title">문서 페이지 목록</h2>
      <button class="document-item__button rootAddDocument">+</button>
    `;
  };
  this.render();

  $header.addEventListener("click", (e) => {
    const { className } = e.target;
    if (className === "document-item__button rootAddDocument") {
      onCreate();
    } else if (className === "document-list-container__title") {
      const $root_ul = $target.querySelector(".root");
      $root_ul.classList.toggle("fold");
    }
  });
}
