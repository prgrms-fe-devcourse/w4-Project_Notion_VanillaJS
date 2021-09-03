export default function Editor({
    $target,
    initialState = {
        titile : '',
        content : ''
    },
    onEditing
}) {
    const $editor = document.createElement('div')

    $target.appendChild($editor)
    let isinitialize = false

    this.state = initialState

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if(!isinitialize){
            $editor.innerHTML = `
            <input type ="text" name = "title" class="editor-title" value = "${this.state.title}"/>
            <textarea name ="content" class="editor-content">${this.state.content}</textarea>
        `
        }
        isinitialize = true
    }

    this.render()

    $editor.addEventListener('keyup', e=>{
        const {target} = e
        const name = target.getAttribute('name')
        if(this.state[name]!==undefined){
            const nextState = {
                ...this.state,
                [name] : target.value
            }

            this.setState(nextState)
            onEditing(this.state)
        }
    })

}