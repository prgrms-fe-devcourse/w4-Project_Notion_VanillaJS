import { request } from "../../util/api.js";
import { emit, on, qs } from "../../util/util.js";
import Component from "../Component.js";
import CreateSidebarBlock from "./CreateSidebarBlock.js";
import SidebarBlock from "./SidebarBlock.js";

class SidebarContainer extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.initialState();
  }
  async initialState() {
    this.state = await request();
    this.render();
  }

  template() {
    return `
      <div class="sidebar-block">
      </div>
      <div class="sidebar-add">
      </div>
    `;
  }
  render() {
    this.$target.innerHTML = this.template();

    new SidebarBlock(qs(".sidebar-block"), {
      state: this.state,
      createNewContent: this.createNewContent.bind(this),
      updateSidebar: this.updateSidebar.bind(this),
    });
    new CreateSidebarBlock(qs(".sidebar-add"), { createNewContent: this.createNewContent.bind(this) });
    this.mount();
  }
  mount() {
    on(this.$target, "@changeSidebar", (e) => this.setState(e.detail));
  }
  async createNewContent(data) {
    this.initialState();
    emit(qs(".notion-content-container"), "@changeContent", data);
  }
  updateSidebar() {
    this.initialState();
  }
}
export default SidebarContainer;
