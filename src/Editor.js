export default function Editor({ $target, initialState = { title: "", content: "" }, onEdit }) {
    const $editor = document.createElement('div')
    $editor.className = 'editor'
    $editor.innerHTML = `
        <input type="text" name="title" placeholder="제목을 입력하세요."/>
        <textarea name="content"/>
    `
    $target.appendChild($editor)
    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
    }

    this.render()

    $editor.querySelector('[name=title').addEventListener('keyup', e => {
        const nextState = {
            ...this.state,
            title: e.target.value
        }
        onEdit(nextState)
        this.setState(nextState)
    })

    $editor.querySelector('[name=content').addEventListener('keyup', e => {
        const nextState = {
            ...this.state,
            content: e.target.value
        }
        onEdit(nextState)
        this.setState(nextState)
    })
}