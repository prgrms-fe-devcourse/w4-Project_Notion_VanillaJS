import { request } from "../../util/api.js";
import { HTTP_METHOD } from "../../util/constant.js";
import { emit, on, qs } from "../../util/util.js";
import Component from "../Component.js";
import ContentComponent from "./ContentComponent.js";
import HeaderComponent from "./HeaderComponent.js";
class ContentContainer extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.state = this.props.state;
    this.state && this.render();
  }

  setState(nextState) {
    this.state = nextState.content;
    this.render();
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
    this.mount();
  }
  mount() {
    const { updateSidebar } = this.props;
    let timer;
    on(this.$target, "keyup", (e) => handleAutoSaveContent(e));

    const handleAutoSaveContent = (e) => {
      const title = qs(".content-header").innerText;
      const content = qs(".content-body").innerText;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const data = await request(this.state.id, HTTP_METHOD.PUT, { title, content });
        updateSidebar(data);
      }, 500);
    };
  }
}
export default ContentContainer;
