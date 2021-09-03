import Editor from "./Editor.js";
import { request } from "./api.js"

export default function EditPage ({ $target, initialState, onChange }) {
    const $editPage = document.createElement('div')
    $editPage.className = 'editPage'
    let timer = null

    const $editor = new Editor ({
        $target: $editPage,
        initialState,
        onEdit: async (state) => {
            onChange({
                id: state.id,
                title: state.title
            })
            if(timer !== null) clearTimeout(timer)
            timer = setTimeout(async () => {
                await request(`/documents/${state.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: state.title,
                        content: state.content
                    })
                })
            }, 5000)
            
        }
    })

    const fetchPost = async () => {
        const { id } = this.state        
        const post = await request(`/documents/${id}`, {
            method: 'GET'
        })
        $editor.setState({
            title: post.title,
            content: post.content,
            id: post.id
        })
    }

    this.state = initialState

    this.setState = async (nextState) => {
        if (nextState.title === undefined) nextState.title = 's'
        this.state = nextState 
        await fetchPost()
        this.render()
    }

    this.render = () => {
        $target.appendChild($editPage)
    }

}