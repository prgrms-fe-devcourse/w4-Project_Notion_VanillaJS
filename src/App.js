import Component from "./component/Component.js";
import ContentContainer from "./component/content/ContentContainer.js";
import WorkSpace from "./component/sidebar/SidebarBlock.js";
import SidebarContainer from "./component/sidebar/SidebarContainer.js";
import { request } from "./util/api.js";
import { HTTP_METHOD } from "./util/constant.js";
import { on, qs, qsAll } from "./util/util.js";

class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }
  template() {
    return `
    <div class="notion-sidebar-container">
    </div>
    <div class="notion-content-container">
    </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    new SidebarContainer(qs(".notion-sidebar-container"));
    new ContentContainer(qs(".notion-content-container"));
  }
}

export default App;
