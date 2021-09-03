export default function Editor({ 
    $target, 
    initialState = {
        title: '',
        content: ''
    },
    onEditing
}) {
    const $editor = document.createElement('div')
    $target.appendChild($editor)
    this.state = initialState
    let isInitialize = false

    this.setState = nextState => {
        this.state = nextState
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        this.render()
    }

    this.render = () => {
        // [렌더링 한번만 하게끔 조치]
        if (!isInitialize) {
            $editor.innerHTML = `
                <input type="text" name="title" style="width: 600px;" value="${this.state.title}"/>
                <textarea name="content" style="width: 600px; height: 400px">${this.state.content}</textarea>
            `
            isInitialize = true
        }
    }
    this.render()
    
    // [키를 누를 때마다 로컬 스토리지에 저장]
    $editor.addEventListener('keyup', e => {
        const { target } = e
        
        const name = target.getAttribute('name')

        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState)
            onEditing(this.state)
        }
         
    })
}