const Component = class {
  $target;
  props;
  state;
  constructor($target, props = {state: null}) {
    this.$target = $target;
    this.props = props;
    this.init()
  }

  init() {
    const { state } = this.props
    this.state = state
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
