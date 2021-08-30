import { getAllData } from "../util/api.js";

import Component from "./Component.js";
import { ToggleTriangle, SidebarEmpty } from "./util/utilComponent.js";
import { customCreateNode, on, qs, qsAll } from "../util/util.js";
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
      console.log(test, "test");
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
    const toggles = qsAll("svg", this.$target);
    toggles.forEach((el) =>
      on(el, "click", (e) => {
        if (e.currentTarget.classList.length < 1) {
          e.currentTarget.classList.add("active");
          e.currentTarget.style.setProperty("--toggle", "180deg");
        } else {
          e.currentTarget.classList.remove("active");
          e.currentTarget.style.setProperty("--toggle", "90deg");
        }
      }),
    );
  }
}

export default WorkSpace;
