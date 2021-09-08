import { getItem,setItem} from "./storage.js"
import { push} from "./router.js";


export default function PostListTrash({$target,initialState,onHardRemove,onRecover,onRemoveAllTrash})
    {
    const $postListTrash = document.createElement('div')

    $target.appendChild($postListTrash)
    
    let init=false;

    this.state = initialState

    this.setState=nextState=>{
        const thrashLocalSaveKey = `temp-trash-${nextState.id}`
        setItem(thrashLocalSaveKey, {
            id:nextState.id ,
            title:nextState.title,
            parent:nextState.parent,
        content:nextState.content})
        if(nextState!=undefined){
        this.state.push(nextState)
        }
        init=true;

        this.render()
    }
    
    this.forRender=()=>{
        if(init===false){
        for (let i in window.localStorage){
            if(getItem(i)!=undefined){
            this.state.push(getItem(i))
            }
        }
        init=true
        }
        this.render()

    }
    
    this.render= () => {
        $postListTrash.innerHTML=`
        <div button class="trash">\u00A0\u00A0🗑\u00A0휴지통</div>
            <ul class="trashList" style="display : none">
                ${this.state.map(a=>`
                <li class="trashDocs"data-id="${a.id}">${a.title}<button class="recoverButton">♻</button>
                 <button class="hardRemoveButton">✂</button>
                </li>`).join('')}
                <div button class="RemoveAllTrash">🗑\u00A0\u00A0휴지통 비우기</div>
            </ul>
            
        <div>
                
    
    
    `
    }
    this.Eventrender= () => {
        $postListTrash.innerHTML=`
        <div button class="trash">\u00A0\u00A0🗑\u00A0휴지통</div>
            <ul class="trashList" style="display : block">
                ${this.state.map(a=>`
                <li class="trashDocs"data-id="${a.id}">${a.title}<button class="recoverButton">♻</button>
                 <button class="hardRemoveButton">✂</button>
                </li>`).join('')}
                <div button class="RemoveAllTrash">🗑\u00A0\u00A0휴지통 비우기</div>
            </ul>
            
        <div>
                
    
    
    `
    }

    
    this.render()

    $postListTrash.addEventListener('click', (e)=> {
        const $li = e.target.closest('li')
        const $div = e.target.closest('div')
        const $ul = e.target.closest('ul')
        if($li){
            const {id} =$li.dataset
            const {className}= e.target
            const titleText=$li.innerText
            const title=titleText.substring(0,titleText.length-3)
            
            console.log(title)

            if(className==='hardRemoveButton'){
                //alert('remove')
                onHardRemove(id)

            }

            else if(className==='recoverButton'){
                alert('수정 후 복구 시키겠습니까?')
                onRecover(id,title)
            }
            else if(className==='trashDocs'){
                alert('휴지통의 내용은 삭제되어 볼 수 없습니다.')
            }

            else{
            push(`/documents/${id}`)
            }

        }
        else if($ul){
            const {className}= e.target
            if(className==='RemoveAllTrash'){
                alert('정말 모두삭제 하시겠습니까?')
                const $elementtrashList=$postListTrash.getElementsByClassName('trashList')
                onRemoveAllTrash()
                for ( let i=0; i<$element.length; i++){
                    $elementtrashList[i].style.display='block'
                }
            }
        }
        else if($div){
            const {className} = e.target
            const $element=$postListTrash.getElementsByClassName('trashList')

            
             if (className === 'trash') {
                if($element[0].style.display==='none'){
                    for ( let i=0; i<$element.length; i++){
                        $element[i].style.display='block'
                    }
                }
                else{
                    for ( let i=0; i<$element.length; i++){
                        $element[i].style.display='none'
                    }
                }
            }
        }
    }
    )
}