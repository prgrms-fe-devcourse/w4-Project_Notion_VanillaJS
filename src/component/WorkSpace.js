import { getAllData } from "../util/api.js";

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
    this.state = await getAllData();
    this.render();
  }

  template() {
    const a = this.spaceRender(this.state, 0);
    for (const test of a) {
      this.$target.appendChild(test);
    }
  }
  render() {
    this.template();
    this.mount();
  }
  spaceRender(children, depth, parent = this.$target) {
    return children.map(({ title, documents }) => {
      if (documents.length > 0) {
        const newNode = customCreateNode(
          "div",
          `<div style="display: flex; padding-left:${depth * 10}px; ">${ToggleTriangle + title}</div>`,
        );
        const siblingNodes = this.spaceRender(documents, depth + 1, newNode);
        for (const sibling of siblingNodes) {
          newNode.appendChild(sibling);
        }
        return newNode;
      } else {
        const newNode = customCreateNode(
          "div",
          `<div style="display: flex; padding-left:${depth * 10}px;">${ToggleTriangle + title}</div>`,
        );
        const siblingNode = customCreateNode("div", SidebarEmpty());
        siblingNode.style.paddingLeft = `${(depth + 2) * 10}px`;
        newNode.appendChild(siblingNode);
        return parent.appendChild(newNode);
      }
    });
  }
  mount() {
    on(this.$target, "click", (e) => {
      const { nodeName: targetNode } = e.target;
      if (targetNode == nodeName.POLYGON || targetNode == nodeName.SVG) {
        handleToggle(e);
      } else {
        console.log("yes");
      }
    });

    const handleToggle = ({ target }) => {
      const svgNode = target.closest("svg");
      if (svgNode.classList.length < 1) {
        svgNode.classList.add("active");
        svgNode.style.setProperty("--toggle", "180deg");
      } else {
        svgNode.classList.remove("active");
        svgNode.style.setProperty("--toggle", "90deg");
      }
    };
  }
}

export default WorkSpace;
