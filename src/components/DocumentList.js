import { displayDocumentList } from "../utils/displayList.js"
import {push} from "../utils/router.js"

export default function PostList({
    $target,
    initialState,
    
}) {
    const $documentList = document.createElement('div')
    $documentList.className = 'document-list'
    $target.appendChild($documentList)
    
    this.state = initialState

    this.setState =  nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $documentList.innerHTML = `
            <button ><i class="fas fa-plus" name ="add-btn parent" data-id = "null"></i> 페이지 추가</button>
            ${displayDocumentList(this.state)}
        `
    }

    $documentList.addEventListener('click', e=> {
        const {target} = e
        const name = target.getAttribute('name')
        if(!name){
            target = target.closest('li')
        }
        console.log
        if(name){
            push({
                type : name,
                id : target.dataset.id
            })
        }
    })

}