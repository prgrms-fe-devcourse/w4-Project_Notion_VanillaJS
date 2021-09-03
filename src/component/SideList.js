export default function SideList({ $target, initialState, onClick, onRemove }) {
  const $sideList = document.createElement("ul");
  $sideList.setAttribute("id", "sideList");

  $target.appendChild($sideList);

  this.state = initialState;

  this.render = () => {
    $sideList.innerHTML = this.state
      .map(
        (list) =>
          `<li class="listTitle" data-listId="${list.id}">
            <button class="openListButton">${list.title}</button>
            <button class="removeListButton">x</button>
          </li>`
      )
      .join("");
    $target.appendChild($sideList);

    // 리스트 내부의 버튼 클릭 없이, li를 클릭해도 이벤트를 작동 시키고 싶었지만, 이벤트가 2번 발생
    $sideList.querySelectorAll(".listTitle").forEach((list) =>
      list.addEventListener("click", (e) => {
        const target = e.target.classList[0];
        if (target != "removeListButton" && target != "openListButton") {
          onClick(e.target.getAttribute("data-listid"));
          $sideList.querySelector(".nowOpened").classList.remove("nowOpened");
          e.target.classList.add("nowOpened");
        }
      })
    );

    // 하는 수없이 동일한 기능을 따로따로(리스트, 버튼) 두번 사용
    $sideList.querySelectorAll(".openListButton").forEach((list) =>
      list.addEventListener("click", (e) => {
        onClick(e.target.closest("li").getAttribute("data-listid"));

        if ($sideList.querySelector(".nowOpened"))
          $sideList.querySelector(".nowOpened").classList.remove("nowOpened");

        e.target.closest("li").classList.add("nowOpened");
      })
    );

    $sideList
      .querySelectorAll(".removeListButton")
      .forEach((list) =>
        list.addEventListener("click", (e) =>
          onRemove(e.target.closest("li").getAttribute("data-listid"))
        )
      );
  };

  this.render();
}
