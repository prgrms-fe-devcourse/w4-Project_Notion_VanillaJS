import {
  isFirstRender,
  liClickRender,
  eraseBtnClickRender,
  editBtnClickRender,
  addBtnClickRender,
  rootAddBtnClick,
} from "./checkCase.js";

export default function PostsList({ $target, initialState = [] }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", "list");
  $target.appendChild($div);
  this.state = initialState;
  let isFirst = "isFirst";
  this.setState = ({ $target, nextState, type }) => {
    this.state = nextState;
    this.render({ $target, type });
  };

  this.render = ({ $target, type }) => {
    // 처음 render될때
    if (type === "isFirst") {
      isFirstRender({ $div, state: this.state });
    } else if (type === "li-click") {
      liClickRender({ $target, state: this.state });
    } else if (type === "erase-btn-click") {
      eraseBtnClickRender({ $div, state: this.state });
    } else if (type === "edit") {
      editBtnClickRender({ $target, state: this.state });
    } else if (type === "add-btn-click") {
      addBtnClickRender({ $target, state: this.state });
    } else if (type === "root-add-btn-click") {
      rootAddBtnClick({ $target, state: this.state });
    }
  };

  this.render({ $target, type: isFirst });
}
