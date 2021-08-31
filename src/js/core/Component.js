const Component = class {
  $target;
  props;
  state;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
  }

  async init() {

    this.render();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mount()
  }

  mount() {}

  setEvent() {}
}

export default Component
