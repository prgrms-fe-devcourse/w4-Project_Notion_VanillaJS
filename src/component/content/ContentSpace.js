import { qs } from "../../util/util.js";
import Component from "../Component.js";
import ContentComponent from "./ContentComponent.js";
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
      <section></section>
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
    new HeaderComponent(qs(".notion-content-container header"), { title: this.state.title });
    new ContentComponent(qs(".notion-content-container section"), { content: this.state.content });
  }
}
export default ContentSpace;
