const Component = class {
  $target;
  props;
  state;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
  }

  async initialState() {

    this.render();
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    }
    this.render();
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  mount() {}

  setEvent() {}
}

export default Component