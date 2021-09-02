import { qs } from "../../util/util.js";
import Component from "../Component.js";
import CreateSidebarBlock from "./CreateSidebarBlock.js";
import SidebarBlock from "./SidebarBlock.js";

class SidebarContainer extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }
  template() {
    return `
      <div class="sidebar-block"></div>
      <div class="sidebar-add">
      </div>
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
    new SidebarBlock(qs(".sidebar-block"), this.props);
    new CreateSidebarBlock(qs(".sidebar-add"));
  }
}
export default SidebarContainer;
