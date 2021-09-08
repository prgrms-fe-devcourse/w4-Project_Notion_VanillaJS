export default function Editor({ $target, currentState, updateContent }) {
    const $editor = document.createElement('div')

    this.state = currentState

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    $target.appendChild($editor);

    this.render = () => {
        const { title, content } = this.state
        $editor.innerHTML = `
                <label for='title' style='visibility:hidden'>제목</label>
                <input name='title' type='text' value='${title}'/>
                <div contentEditable='true'>${content}</div>
            `
    }

    $editor.addEventListener('keyup', (event) =>{
        const { textContent } = event.target
        const $input = $editor.querySelector('input[name=title]')
        const title = $input.value

        if(title && textContent){
            updateContent(title, textContent)
        }
    })
    
    this.render()
}
