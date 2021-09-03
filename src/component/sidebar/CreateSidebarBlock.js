import { on } from "../../util/util.js";
import Component from "../Component.js";
import { PlusBtn } from "../util/utilComponent.js";
import { makeTitlePrompt } from "./util.js";

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

  mount() {
    const { createNewContent } = this.props;
    on(this.$target, "click", async () => {
      makeTitlePrompt(createNewContent, null);
    });
  }
}

export default CreateSidebarBlock;
