import Component from "../Component.js";

class ContentComponent extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    let { content } = this.props;
    if (content) {
      content = content.replaceAll(/\n/g, "<br>");
    }
    return `
      ${!content ? "" : content}
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
  }
}
export default ContentComponent;
