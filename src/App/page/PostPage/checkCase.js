import { setItem, getItem, removeItem } from "../../../storage/storage.js";

const isFirstRender = ({ $div, state }) => {
  if (!getItem("toggle")) {
    $div.innerHTML = `<button class="root-add-btn" class="root-add-btn"> Root ➕</button>
         <ul class="rootUl">
        ${state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false" >
                    <span class="span-tag">${document.title}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>
               </li>`
          )
          .join("")}
        </ul>
          `;
  } else {
    console.log("!!");
    $div.closest(".list").innerHTML = getItem("toggle");
  }
};

const liClickRender = ({ $target, state }) => {
  // 닫혀있는 것을 클릭할 때
  if (!JSON.parse($target.dataset.isOpen)) {
    $target.dataset.isOpen = true;
    $target.innerHTML = `<span class="span-tag">${$target.firstElementChild.innerText}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>`;
    $target.insertAdjacentHTML(
      "beforeend",
      `
         <ul>
        ${state
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
  // 열려있는 다시 누룰때 (닫는 역할)
  else {
    $target.dataset.isOpen = false;
    $target.innerHTML = `<span class="span-tag">${$target.firstElementChild.innerText}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>`;
  }

  setItem("toggle", $target.closest(".rootUl"));
};

const eraseBtnClickRender = ({ $div, state }) => {
  $div.innerHTML = `
        <button class="root-add-btn"> Root ➕</button>
         <ul class="rootUl">
        ${state
          .map(
            (document) =>
              `<li class="li-tag" id=${document.id} data-is-open="false" >
                    <span class="span-tag">${document.title}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button></li>`
          )
          .join("")}
        </ul>
          `;

  setItem("toggle", $target.closest(".rootUl"));
};

const editBtnClickRender = ({ $target, state }) => {
  $target.firstElementChild.innerHTML = state.title;
  setItem("toggle", $target.closest(".rootUl"));
};

const addBtnClickRender = ({ $target, state }) => {
  $target.dataset.isOpen = true;
  $target.innerHTML = `<span class="span-tag">${$target.firstElementChild.innerText}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>`;
  $target.insertAdjacentHTML(
    "beforeend",
    `
         <ul>
        ${state
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
  setItem("toggle", $target.closest(".rootUl"));
};

const rootAddBtnClick = ({ $target, state }) => {
  $target.insertAdjacentHTML(
    "beforeend",
    `<li class="li-tag" id=${state.id} data-is-open="false">
                    <span class="span-tag">${state.title}</span><button class="add-btn">➕</button><button class="erase-btn">🗑</button>
                    </li>`
  );

  setItem("toggle", $target.closest(".rootUl"));
};

export {
  isFirstRender,
  liClickRender,
  eraseBtnClickRender,
  editBtnClickRender,
  addBtnClickRender,
  rootAddBtnClick,
};
