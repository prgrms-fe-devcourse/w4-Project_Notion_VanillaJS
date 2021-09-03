import Component from "../Component.js";

class ContentComponent extends Component {
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    const { content } = this.props;
    return `
      ${!content ? "" : content}
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
  }
}
export default ContentComponent;
