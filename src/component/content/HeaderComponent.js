import { qs } from "../../util/util.js";
import Component from "../Component.js";

class HeaderComponent extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    const { title, editable } = this.props;
    return `
      <div class="content-header" contenteditable=${editable} placeholder="제목을 입력해 주세요">
        ${title}
      </div>
    `;
  }
  mount() {}
}

export default HeaderComponent;
