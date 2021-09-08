import Editor from './Editor.js'
import { setItem } from './storage.js'

export default function EditorPage({ $target, currentState, updateContent }) {
    this.state = currentState

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    new Editor({
        $target,
        currentState,
        updateContent
    })

    this.render = () => {
        
    }

    this.render()
}
