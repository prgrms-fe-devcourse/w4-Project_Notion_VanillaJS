import { NODE_NAME } from "../../util/constant.js";
import { on, qsAll } from "../../util/util.js";
import Component from "../Component.js";
import { createSidebarBlocks, makeDeletePrompt, makeTitlePrompt, showSelectedContent, styleHover, styleToggleBtn } from "./util.js";

class SidebarBlock extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.state = this.props.state;
    this.render();
  }

  template() {
    return createSidebarBlocks(this.state, 0);
  }
  render() {
    this.$target.innerHTML = "";
    const siblings = this.template();
    for (const sibling of siblings) {
      sibling.children[0].classList.add("0");
      this.$target.appendChild(sibling);
    }
    this.mount();
  }

  mount() {
    qsAll(".notion-sidebar-block").forEach((el) => {
      on(el, "mouseover", (e) => styleHover(e, 1)), on(el, "mouseout", (e) => styleHover(e, 0));
    });
    on(this.$target, "click", (e) => this.handleSideBarClick(e), true);
  }

  async handleSideBarClick({ target }) {
    const { createNewContent, updateSidebar } = this.props;
    const { nodeName: selectedNodeName } = target;

    if (target.classList[0] === "toggle") {
      styleToggleBtn(target);
    } else if (selectedNodeName === NODE_NAME.BUTTON) {
      const parentTitleId = target.dataset.id;
      await makeTitlePrompt(createNewContent, parentTitleId);
    } else if (target.classList[0] === "trash") {
      const deleteContentId = target.closest("div").dataset.id;
      await makeDeletePrompt(updateSidebar, deleteContentId);
    } else if (target.closest("div").classList[0] === "notion-sidebar-block") {
      const selectedTitleId = target.closest("div").dataset.id;
      await showSelectedContent(selectedTitleId);
    }
  }
}

export default SidebarBlock;
