import { on, qs } from "../../util/util.js";
import Component from "../Component.js";
import ContentComponent from "../content/ContentComponent.js";
import HeaderComponent from "../content/HeaderComponent.js";
import { changeToMd } from "./util.js";
class ViewerContainer extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.initialState();
  }
  initialState() {
    this.state = this.props.state;

    if (this.state) {
      let { title, content } = this.state;
      content = content ? changeToMd(content) : content;
      this.state = { title, content };
      this.render();
    }
  }
  template() {
    return `
      <h1></h1>
      <div class="content-body" placeholder="내용을 입력해 주세요">
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();

    new HeaderComponent(qs(".viewer h1"), { title: this.state.title, editable: false });
    new ContentComponent(qs(".viewer .content-body"), { content: this.state.content });

    this.mount();
  }

  mount() {
    on(this.$target, "@reflectHeaderToViewer", (e) => {
      qs(".viewer h1").innerHTML = e.detail;
    });
    on(this.$target, "@reflectContentToViewer", (e) => {
      qs(".viewer .content-body").innerHTML = changeToMd(e.detail);
    });
  }
}
export default ViewerContainer;
