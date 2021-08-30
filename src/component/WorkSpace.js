import { request } from "../util/api.js";

import Component from "./Component.js";
import { ToggleTriangle, SidebarEmpty } from "./util/utilComponent.js";
import { customCreateNode, on, qs, qsAll } from "../util/util.js";
import { nodeName } from "../util/constant.js";
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
    const siblings = this.spaceRender(this.state, 0);
    for (const sibling of siblings) {
      this.$target.appendChild(sibling);
    }
  }
  render() {
    this.template();
    this.mount();
  }

  mount() {
    qsAll(".notion-sidebar-block").forEach((el) => {
      on(el, "mouseover", (e) => this.styleHoverAddBtn(e, 1)), on(el, "mouseout", (e) => this.styleHoverAddBtn(e, 0));
    });
    on(this.$target, "click", async (e) => {
      const { nodeName: targetNode } = e.target;
      if (targetNode == nodeName.POLYGON || targetNode == nodeName.SVG) {
        this.styleToggleBtn(e);
      }
    });
  }

  spaceRender(children, depth, parent = this.$target) {
    return children.map(({ id, title, documents }) => {
      if (documents.length > 0) {
        const newNode = customCreateNode(
          "div",
          `<div class="notion-sidebar-block" style=padding-left:${depth * 10}px;" data-id=${id}>
            ${ToggleTriangle}
            <span>${title}</span>
            <button class="add">+</button>
          </div>`,
        );
        const siblingNodes = this.spaceRender(documents, depth + 1, newNode);
        for (const sibling of siblingNodes) {
          newNode.appendChild(sibling);
        }
        return newNode;
      } else {
        const newNode = customCreateNode(
          "div",
          `<div class="notion-sidebar-block" style="padding-left:${depth * 10}px;" data-id=${id}>
            ${ToggleTriangle} 
            <span>${title}</span>
            <button class="add">+</button>
          </div>`,
        );

        const siblingNode = customCreateNode("div", SidebarEmpty());
        siblingNode.style.paddingLeft = `${(depth + 2) * 10}px`;
        newNode.appendChild(siblingNode);
        return parent.appendChild(newNode);
      }
    });
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
  styleHoverAddBtn = (e, opacity) => {
    if (e.currentTarget.classList.value === "notion-sidebar-block") {
      const btn = qs("button", e.currentTarget);
      btn.style.opacity = opacity;
    }
  };
}

export default WorkSpace;
