export default function Editor({$target, initialState, onEditing}){
    const $editor = document.createElement('div')
    $editor.classList.add('inputEditor')
    $target.appendChild($editor)

    $editor.innerHTML = `
    <input type="text" name="title"/>
    <textarea name="content"></textarea> 
    `
    this.state = initialState

    

    this.setState = (nextState) => {
        this.state = nextState
        this.render()        
    }

    this.render = () =>{
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
    }

    this.render()

    $editor.querySelector('[name=title]').addEventListener('keyup',e=>{
        const nextState = {
            ...this.state,
            title: e.target.value
        }
        this.setState(nextState)
        onEditing(this.state)
    })
    $editor.querySelector('[name=content]').addEventListener('input',e=>{
        const nextState = {
            ...this.state,
            content: e.target.value
        }
        this.setState(nextState)
        onEditing(this.state)
    })
}
