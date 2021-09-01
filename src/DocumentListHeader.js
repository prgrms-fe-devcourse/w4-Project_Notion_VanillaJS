export default function DocumentListHeader({ $target, onCreate }) {
  const $documentListHeader = document.createElement("div");
  $target.appendChild($documentListHeader);

  this.render = () => {
    $documentListHeader.innerHTML = `
      <h2>페이지 목록</h2>
      <button class="createDoc">+</button>
      <span>페이지 추가</span>
      `;
  };

  this.render();

  $documentListHeader.addEventListener("click", (e) => {
    const { className } = e.target;
    if (className === "createDoc") {
      onCreate();
    }
  });
}
