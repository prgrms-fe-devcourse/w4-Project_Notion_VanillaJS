import { on, qs, qsAll } from "../../util/util.js";
import Component from "../Component.js";
import ContentComponent from "./ContentComponent.js";
import HeaderComponent from "./HeaderComponent.js";
import { request } from "../../util/api.js";
import { HTTP_METHOD } from "../../util/constant.js";
import ViewerContainer from "../viewer/ViewerContainer.js";
import { reflectToViewer } from "./util.js";
class ContentContainer extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.state && this.render();
    this.initialEvent();
  }
  initialEvent() {
    on(this.$target, "@changeContent", ({ detail }) => this.setState(detail));
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  template() {
    return `
    <div class="editor">
      <h1></h1>
      <div class="content-body" contentEditable="true" placeholder="내용을 입력해 주세요">
      </div>
    </div>
    <div class="viewer">
    </div>
    `;
  }
  render() {
    this.$target.innerHTML = this.template();

    new HeaderComponent(qs(".editor h1"), { title: this.state.title, editable: true });
    new ContentComponent(qs(".content-body"), {
      content: this.state.content ? this.state.content.replaceAll(/\n/g, "<br>") : this.state.content,
    });
    new ViewerContainer(qs(".viewer"), { state: this.state });
    this.mount();
  }
  mount() {
    let timer;
    on(this.$target, "keyup", async (e) => {
      reflectToViewer(e.target);
      handleAutoSaveContent(e);
    });

    const handleAutoSaveContent = async (e) => {
      const id = this.state.id;
      const title = qs(".editor .content-header").innerText;
      const content = qs(".editor .content-body").innerText;
      if (e.target.className === "content-header") {
        qsAll(".notion-sidebar-block").forEach((el) => {
          if (el.dataset.id == id) {
            qs("span", el).innerText = title;
          }
        });
        return;
      }
      function lazyUpdateContent() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(async () => {
          await request(id, HTTP_METHOD.PUT, { title, content });
        }, 1000);
      }
      lazyUpdateContent();
    };
  }
}
export default ContentContainer;
