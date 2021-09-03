import AddButton from './AddButton.js';

export default class DocumentList{
    constructor({ $target, initialState }) {
        this.$target = $target;
        this.state = initialState;

        this.$documentList = document.createElement('div');
        
        this.$addButton = new AddButton({
            $target: this.$documentList,
            initialState: {
                title: '+ 페이지 추가',
                parent: null
            }
        });
        
        this.render();
    }
    
    setState(nextState) {
        this.state = nextState;
        this.render();
    }
    
    render() {
        this.$target.appendChild(this.$documentList);
    }
}