import { qs } from "../../util/util.js";
import Component from "../Component.js";
import SidebarBlock from "./SidebarBlock.js";

class SidebarContainer extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }
  template() {
    return `<div class="sidebar-block"></div>`;
  }
  render() {
    this.$target.innerHTML = this.template();
    new SidebarBlock(qs(".sidebar-block"), this.props);
  }
}
export default SidebarContainer;
