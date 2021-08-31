import { request } from "../util/api.js";

import Component from "./Component.js";
import { ToggleTriangle, SidebarEmpty } from "./util/utilComponent.js";
import { customCreateNode, on, qs, qsAll } from "../util/util.js";
import { HTTP_METHOD, NODE_NAME } from "../util/constant.js";
class WorkSpace extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.initialState();
  }
  async initialState() {
    this.state = await request();
    this.render();
  }
  template() {
    return this.spaceRender(this.state, 0);
  }
  render() {
    this.$target.innerHTML = "";
    const siblings = this.template();
    for (const sibling of siblings) {
      this.$target.appendChild(sibling);
    }
    this.mount();
  }

  mount() {
    qsAll(".notion-sidebar-block").forEach((el) => {
      on(el, "mouseover", (e) => this.styleHoverAddBtn(e, 1)), on(el, "mouseout", (e) => this.styleHoverAddBtn(e, 0));
    });
    on(this.$target, "click", (e) => this.handleSideBarClick(e));
  }

  spaceRender(children, depth, parent = this.$target) {
    return children.map(({ id, title, documents }) => {
      const newNode = customCreateNode(
        "div",
        `<div class="notion-sidebar-block" data-id=${id} style="padding-left:${depth * 10}px;" >
          ${ToggleTriangle}
          <span>${title}</span>
          <button class="add" data-id=${id}>+</button>
        </div>`,
      );
      if (documents.length > 0) {
        const siblingNodes = this.spaceRender(documents, depth + 1, newNode);
        for (const sibling of siblingNodes) {
          newNode.appendChild(sibling);
        }
        return newNode;
      }
      const siblingNode = customCreateNode("div", SidebarEmpty());
      siblingNode.style.paddingLeft = `${(depth + 2) * 10}px`;
      newNode.appendChild(siblingNode);
      return parent.appendChild(newNode);
    });
  }

  async handleSideBarClick(e) {
    const { nodeName: targetNode } = e.target;
    if (targetNode === NODE_NAME.POLYGON || targetNode === NODE_NAME.SVG) {
      this.styleToggleBtn(e);
    } else if (targetNode === NODE_NAME.BUTTON) {
      const data = prompt("제목을 입력하세요");
      data && (await request(null, HTTP_METHOD.POST, { parent: e.target.dataset.id, title: data }));
      this.setState(await request());
    } else if (e.target.closest("div").className === "notion-sidebar-block") {
      const { id } = e.target.closest("div").dataset;
      const data = await request(id, HTTP_METHOD.GET);
      console.log(data);
    }
  }

  styleToggleBtn = ({ target }) => {
    const svgNode = target.closest("svg");
    if (svgNode.classList.length < 1) {
      svgNode.classList.add("active");
      svgNode.style.setProperty("--toggle", "180deg");
    } else {
      svgNode.classList.remove("active");
      svgNode.style.setProperty("--toggle", "90deg");
    }
  };
  styleHoverAddBtn = ({ currentTarget }, opacity) => {
    if (currentTarget.classList.value === "notion-sidebar-block") {
      const btn = qs("button", currentTarget);
      btn.style.opacity = opacity;
    }
  };
}

export default WorkSpace;
