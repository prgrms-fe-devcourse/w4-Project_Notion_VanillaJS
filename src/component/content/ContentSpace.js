import { qs } from "../../util/util.js";
import Component from "../Component.js";
import HeaderComponent from "./HeaderComponent.js";
class ContentSpace extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.props && (this.state = this.props.state);
    this.state && this.render();
  }

  template() {
    return `
      <header></header>
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
    new HeaderComponent(qs(".notion-content-container header"), { title: this.state.title });
  }
}
export default ContentSpace;
