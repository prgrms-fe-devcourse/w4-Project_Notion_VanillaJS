import { on, qs } from "../../util/util.js";
import Component from "../Component.js";
import { PlusBtn } from "../util/utilComponent.js";

class CreateSidebarBlock extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }
  template() {
    return `
    ${PlusBtn}
      <p> 페이지 추가</p>
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  mount() {
    on(this.$target, "click", (e) => {
      console.log(e.target);
    });
  }
}
export default CreateSidebarBlock;
