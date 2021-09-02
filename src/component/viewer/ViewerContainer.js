import { on, qs } from "../../util/util.js";
import Component from "../Component.js";
import HeaderComponent from "../content/HeaderComponent.js";

class ViewerContainer extends Component {
  constructor(...rest) {
    super(...rest);
    this.state = this.props.state;
    this.state && this.render();
  }
  template() {
    return `<h1></h1>`;
  }

  render() {
    this.$target.innerHTML = this.template();
    new HeaderComponent(qs(".viewer h1"), { title: this.state.title, editable: false });
    this.mount();
  }
  mount() {
    on(this.$target, "@reflectHeaderToViewer", (e) => {
      qs(".viewer h1").innerHTML = e.detail;
    });
  }
}
export default ViewerContainer;
