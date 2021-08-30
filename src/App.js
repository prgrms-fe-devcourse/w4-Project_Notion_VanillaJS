import Component from "./component/Component.js";
import WorkSpace from "./component/WorkSpace.js";
import { qs } from "./util/util.js";

class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    return `
    <div class ="notion-sidebar-container">

    </div>
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
    new WorkSpace(qs(".notion-sidebar-container"));

    this.mount();
  }
}

export default App;
