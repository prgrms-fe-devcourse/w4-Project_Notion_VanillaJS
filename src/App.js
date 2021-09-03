import Component from "./component/Component.js";
import ContentContainer from "./component/content/ContentContainer.js";
import SidebarContainer from "./component/sidebar/SidebarContainer.js";
import { qs } from "./util/util.js";

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
