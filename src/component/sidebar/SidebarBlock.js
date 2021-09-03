import { request } from "../../util/api.js";
import { HTTP_METHOD, NODE_NAME } from "../../util/constant.js";
import { customCreateNode, emit, on, qs, qsAll } from "../../util/util.js";
import Component from "../Component.js";
import { SidebarEmpty, ToggleTriangle, Trash } from "../util/utilComponent.js";
import { hideChildNode, showChildNode } from "./util.js";

class SidebarBlock extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.state = this.props.state;
    this.render();
  }

  template() {
    return this.spaceRender(this.state, 0);
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
      on(el, "mouseover", (e) => this.styleHover(e, 1)), on(el, "mouseout", (e) => this.styleHover(e, 0));
    });
    on(this.$target, "click", (e) => this.handleSideBarClick(e), true);
  }

  spaceRender(children, depth, parent = this.$target) {
    return children.map(({ id, title, documents }) => {
      const newNode = customCreateNode(
        "div",
        `<div class="notion-sidebar-block" data-id=${id} style="padding-left:${depth * 10}px; ${depth > 0 && "display: none;"}" >
          ${ToggleTriangle}
          <span>${title}</span>
          ${Trash}
          <button class="add" data-id=${id}>+</button>
        </div>`,
      );
      if (documents.length > 0) {
        const siblingNodes = this.spaceRender(documents, depth + 1, newNode);
        for (const sibling of siblingNodes) {
          sibling.children[0].classList.add(newNode.children[0].dataset.id);
          newNode.appendChild(sibling);
        }
        return newNode;
      }
      const siblingNode = customCreateNode("div", SidebarEmpty);
      siblingNode.style.paddingLeft = `${(depth + 2) * 10}px`;
      siblingNode.style.display = "none";
      siblingNode.classList.add("empty-block");
      siblingNode.classList.add(id);
      newNode.appendChild(siblingNode);
      return parent.appendChild(newNode);
    });
  }

  async handleSideBarClick(e) {
    const { createNewContent, updateSidebar } = this.props;
    const { nodeName: targetNode } = e.target;
    if (e.target.classList[0] === "toggle") {
      this.styleToggleBtn(e);
    } else if (targetNode === NODE_NAME.BUTTON) {
      const data = prompt("제목을 입력하세요");
      if (data) {
        try {
          const result = await request(null, HTTP_METHOD.POST, { parent: e.target.dataset.id, title: data });
          history.pushState(result, "", `/documents/${result.id}`);
          createNewContent(result);
        } catch (e) {
          alert(e);
        }
      }
    } else if (e.target.classList[0] === "trash") {
      const data = confirm("이 문서를 삭제하시겠습니까?");
      if (data) {
        await request(e.target.closest("div").dataset.id, HTTP_METHOD.DELETE);
        history.pushState(null, "", `/`);
        updateSidebar();
      }
    } else if (e.target.closest("div").classList[0] === "notion-sidebar-block") {
      const { id } = e.target.closest("div").dataset;
      const data = await request(id, HTTP_METHOD.GET);
      console.log(data, "sidebar request");
      emit(qs(".notion-content-container"), "@changeContent", { id: data.id, title: data.title, content: data.content });
      history.pushState(null, "", `/documents/${id}`);
    }
  }

  styleToggleBtn = ({ target }) => {
    const svgNode = target.closest("svg");

    if (svgNode.classList.length < 2) {
      svgNode.classList.add("active");
      svgNode.style.setProperty("--toggle", "180deg");
      showChildNode(target);
    } else {
      svgNode.classList.remove("active");
      svgNode.style.setProperty("--toggle", "90deg");
      hideChildNode(target);
    }
  };
  styleHover = ({ currentTarget }, opacity) => {
    if (currentTarget.classList[0] === "notion-sidebar-block") {
      const btn = qs("button", currentTarget);
      const trashBtn = qs("svg.trash", currentTarget);
      trashBtn.style.opacity = opacity;
      btn.style.opacity = opacity;
    }
  };
}

export default SidebarBlock;
