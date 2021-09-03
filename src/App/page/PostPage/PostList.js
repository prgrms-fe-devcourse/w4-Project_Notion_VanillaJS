export default function PostsList({ $target, initialState = [] }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", "list");
  $target.appendChild($div);
  this.state = initialState;
  let isFirst = true;

  this.setState = ({ $target, nextState, type }) => {
    this.state = nextState;

    this.render({ $target, type });
  };

  this.render = ({ $target, type }) => {
    // 처음 render될때
    if (isFirst) {
      $div.innerHTML = `<button class="root-add-btn" class="root-add-btn"> Root ➕</button>
         <ul>
        ${this.state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false" >
                    <span class="span-tag">${document.title}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>
               </li>`
          )
          .join("")}
        </ul>
          `;
      isFirst = false;
    }
    // 그외의 렌더
    else if (type === "li-click") {
      // 닫혀있는 것을 클릭할 때
      if (!JSON.parse($target.dataset.isOpen)) {
        $target.dataset.isOpen = true;
        $target.innerHTML = `<span class="span-tag">${$target.firstElementChild.innerText}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>`;
        $target.insertAdjacentHTML(
          "beforeend",
          `
         <ul>
        ${this.state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false">
                    <span class="span-tag">${document.title}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>
                    </li>`
          )
          .join("")}
        </ul>
          `
        );
      }
      // 열려있는 새로운 것을 열때
      else {
        $target.dataset.isOpen = false;
        $target.innerHTML = `<span class="span-tag">${$target.firstElementChild.innerText}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>`;
      }
    } else if (type === "erase-btn-click") {
      $div.innerHTML = `
        <button class="root-add-btn"> Root ➕</button>
         <ul>
        ${this.state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false" >
                    <span class="span-tag">${document.title}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button></li>`
          )
          .join("")}
        </ul>
          `;
    } else if (type === "edit-btn-click") {
      $target.firstElementChild.innerHTML = this.state.title;
    } else if (type === "add-btn-click") {
      $target.dataset.isOpen = true;
      $target.innerHTML = `<span class="span-tag">${$target.firstElementChild.innerText}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>`;
      $target.insertAdjacentHTML(
        "beforeend",
        `
         <ul>
        ${this.state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false">
                    <span class="span-tag">${document.title}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>
                    </li>`
          )
          .join("")}
        </ul>
          `
      );
    } else if (type === "root-add-btn-click") {
      $target.insertAdjacentHTML(
        "beforeend",
        `<li class="li-tag" id=${this.state.id} data-is-open="false">
                    <span class="span-tag">${this.state.title}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>
                    </li>`
      );
    }
  };

  this.render({});
}
