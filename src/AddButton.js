export default class AddButton{
    constructor({ $target, initialState }) {
        this.$target = $target;
        this.state = initialState;
        this.$addWrap = document.createElement('ul');
        this.$target.appendChild(this.$addWrap);
        this.isInit = false;
        this.render();
    }

    setState({ title, parent }) {
        this.state = nextState;
        console.log(this.state);
    }

    render() {
        this.$addWrap.innerHTML = `
            <li><span>${this.state.title}</span><button>+</button></li>
        `;
    }

    addMouseEvent() {
        if (!this.isInit) {
            this.$addWrap.addEventListener('mouseup', function (e) {
                this.state.toggled === false ? e.target.style.backgroundColor = 'blue' : e.target.style.backgroundColor = '';
            });
            this.isInit = true;
        }
    }
}