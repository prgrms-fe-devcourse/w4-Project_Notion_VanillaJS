export default function PostsList({ $target, initialState = [] }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", "list");
  $target.appendChild($div);
  this.state = initialState;
  let isFirst = true;

  this.setState = ({ $target, nextState, type }) => {
    // console.log($target, nextState, type);
    this.state = nextState;

    this.render({ $target, type });
  };

  this.render = ({ $target, type }) => {
    // console.log($target, type);
    // 처음 render될때
    if (isFirst) {
      $div.innerHTML = `
         <ul>
        ${this.state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false" data-text="${document.title}">${document.title}<button class="btn">X</button></li>`
          )
          .join("")}
        </ul>
          `;
      isFirst = false;
    }
    // 그외의 렌더
    else if (type === "li-click") {
      // 열려있는 것을 클릭할 때
      if (!JSON.parse($target.dataset.isOpen)) {
        $target.dataset.isOpen = true;
        $target.innerHTML = `${$target.dataset.text}<button class="btn">X</button>`;
        $target.insertAdjacentHTML(
          "beforeend",
          `
         <ul>
        ${this.state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false" data-text="${document.title}">${document.title}<button class="btn">X</button></li>`
          )
          .join("")}
        </ul>
          `
        );
      }
      // 닫혀있는 새로운 것을 열때
      else {
        $target.dataset.isOpen = false;
        $target.innerHTML = `${$target.dataset.text}<button class="btn">X</button>`;
      }
    } else if (type === "btn-click") {
      $div.innerHTML = `
         <ul>
        ${this.state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false" data-text="${document.title}">${document.title}<button class="btn">X</button></li>`
          )
          .join("")}
        </ul>
          `;
    }
  };

  this.render({});
}
