import { displayDocumentList } from "../utils/displayList.js"
import {push} from "../utils/router.js"

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
            <button name ="add-btn" data-id = "null">Add</button>
            ${displayDocumentList(this.state)}
        `
    }

    $documentList.addEventListener('click', e=> {
        const {target} = e
        const name = target.getAttribute('name')
        // console.log(target.dataset.id)
        if(name){
            push({
                type : name,
                id : target.dataset.id
            })
        }
    })

}