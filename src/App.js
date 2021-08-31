import Component from "./component/Component.js";
import ContentSpace from "./component/content/ContentSpace.js";
import WorkSpace from "./component/WorkSpace.js";
import { on, qs } from "./util/util.js";

class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.state = {
      content: null,
    };
    this.render();
  }
  setState(nextState) {
    for (const props of Object.keys(nextState)) {
      if (props === "content") {
        this.state.content = nextState.content;
        new ContentSpace(qs(".notion-content-container"), { state: this.state.content });
      }
    }
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
    new WorkSpace(qs(".notion-sidebar-container"));
    this.mount();
  }

  mount() {
    on(qs(".notion-sidebar-container"), "@changeState", (e) => this.setState({ content: e.detail }));
  }
}

export default App;
