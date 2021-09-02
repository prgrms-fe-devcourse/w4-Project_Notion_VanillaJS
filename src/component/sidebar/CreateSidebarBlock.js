import { request } from "../../util/api.js";
import { HTTP_METHOD } from "../../util/constant.js";
import { on } from "../../util/util.js";
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

  mount() {
    const { createNewContent } = this.props;

    on(this.$target, "click", async () => {
      const newSideBlockTitle = prompt("제목을 입력하세요");
      if (newSideBlockTitle) {
        const result = await request(null, HTTP_METHOD.POST, { title: newSideBlockTitle });
        history.pushState(result, "", `/documents/${result.id}`);
        createNewContent(result);
      }
    });
  }
}
export default CreateSidebarBlock;
