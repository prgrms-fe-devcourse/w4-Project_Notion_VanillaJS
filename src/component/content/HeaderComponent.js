import { qs } from "../../util/util.js";
import Component from "../Component.js";

class HeaderComponent extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    const { title } = this.props;
    return `
      <h1><div class="content-header" contentEditable=true>${title}</div></h1>
    `;
  }
  mount() {}
}

export default HeaderComponent;
