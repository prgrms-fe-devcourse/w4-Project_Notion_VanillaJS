import { displayDocumentList } from "../utils/displayList.js"

export default function PostList({
    $target,
    initialState,
    
}) {
    const $documentList = document.createElement('div')
    $target.appendChild($documentList)
    
    this.state = initialState

    this.setState =  nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $documentList.innerHTML = `
            <button name ="button" data-id = "null">Add</button>
            ${displayDocumentList(this.state)}
        `
    }

}