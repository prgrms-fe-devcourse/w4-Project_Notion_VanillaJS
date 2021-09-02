import { request } from "../../util/api.js";
import { HTTP_METHOD } from "../../util/constant.js";
import { on, qs } from "../../util/util.js";
import Component from "../Component.js";

class ContentComponent extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.render();
  }
  template() {
    const { content } = this.props;
    return `
      <div class="content-body" contentEditable="true" placeholder="내용을 입력해 주세요">
        ${!content ? "" : content}
      </div>
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
  }
}
export default ContentComponent;
