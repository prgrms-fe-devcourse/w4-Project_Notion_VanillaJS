import Component from "./component/Component.js";
import ContentContainer from "./component/content/ContentContainer.js";
import WorkSpace from "./component/WorkSpace.js";
import { request } from "./util/api.js";
import { HTTP_METHOD } from "./util/constant.js";
import { on, qs, qsAll } from "./util/util.js";

class App extends Component {
  constructor(...rest) {
    super(...rest);
    this.state = {
      sidebar: null,
      content: null,
    };
    this.initialState();
  }

  async initialState() {
    this.state.sidebar = await request();
    this.render();
  }
  setState(nextState) {
    for (const key of Object.keys(nextState)) {
      this.state = { ...this.state, [key]: nextState[key] };
    }
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
    const updateSidebar = async (data) => {
      const sidebar = await request();
      this.setState({ content: data, sidebar });
    };
    const createNewContent = async (data) => {
      const sidebar = await request();
      this.setState({ sidebar, content: data });
    };
    const changeContent = async (data) => {
      this.setState({ content: data });
    };
    new WorkSpace(qs(".notion-sidebar-container"), { state: this.state.sidebar, createNewContent, changeContent });
    new ContentContainer(qs(".notion-content-container"), { state: this.state.content, updateSidebar });

    this.mount();
  }

  mount() {
    on(qs(".notion-sidebar-container"), "@changeState", (e) => this.setState({ content: e.detail }));
  }
}

export default App;
