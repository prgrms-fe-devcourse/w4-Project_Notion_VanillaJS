import { push } from "./router.js"
import LinkButton from "./LinkButton.js"

export default function PostList({$target, initialState, onRemove, onAdd}){ 
     const $postList = document.createElement('div')
    
    //const $postList=$target

    $target.appendChild($postList)

    this.state = initialState
    this.prestate = initialState

    this.setState=nextState=>{
        this.state=nextState
        this.render()
    }

    this.render=()=>{

        console.log(this.state)

        const childCheck =  (child) =>{
            let childDocument=[]
            if(child.length!=0){
                for(let i in child){
                      console.log(child[i])
                      childDocument.push(`
                      <li data-id="${child[i].id}" class="documentsChildList">
                      <button class="arrowChildButton">▶</button>
                      📑${child[i].title}
                        <button class="addDocuments">┼</button>
                        <button class="removeDocuments">━</button>
                            <ul class="docsChildList" style="display:none"> 
                            ${childCheck(child[i].documents)}   
                            </ul>
                        <li>`)
                        
                    }
                return childDocument.join('')
                
            }
            else{
                return ` `
            }
        }

        //console.log(childDocs.id)
        
        $postList.innerHTML=`
        <ul class="docsList">

            ${this.state.map(docs =>
                `
                <li data-id="${docs.id}" class="documentsList">
                <button class="arrowButton">▶</button>
                \u00A0📄${docs.title}
                
                <button class="addDocuments">┼</button>
                <button class="removeDocuments">━</button>
                <ul class="docsChildList" style="display:none">
                    ${childCheck(docs.documents)}
                </ul>

               </li> `).join('')}
        <ul>`
    }

    this.render()
    $postList.addEventListener('click', (e)=> {
        const $li = e.target.closest('li')
        const $button = e.target.closest('button')
        if($li){
            const {id} =$li.dataset
            const {className}= e.target

            if(className==='removeDocuments'){
                //alert('remove')
                onRemove(id)
            }

            else if(className==='addDocuments'){
                alert('add')
                push(`/documents/new/${id}`)
            }
            
            else if(className==='arrowButton'){
                    const $arrowbutton= $li.getElementsByClassName('arrowButton')
                    if($arrowbutton[0].style.transform===`rotate(${90}deg)`){
                        console.log('dddddd')
                        $arrowbutton[0].style=`-webkit-transform:rotate(${0}deg)`
                    }
                    else{   
                    $arrowbutton[0].style=`-webkit-transform:rotate(${90}deg)`//'color:red'//
                    }
                    //console.log($arrowbutton[0].style.transform===`rotate(${90}deg)`)
         
                    const $element=$li.getElementsByClassName('docsChildList')
                    console.log($element)
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
                        //$arrowbutton[0].style='-webkit-transform:rotate(90deg)'
                        push(`/documents/${id}`)
                }
            else if(className==='arrowChildButton'){
                const $arrowChildButton= $li.getElementsByClassName('arrowChildButton')
                    const $Childelement=$li.getElementsByClassName('docsChildList')
                    if($arrowChildButton[0].style.transform===`rotate(${90}deg)`){
                        $arrowChildButton[0].style=`-webkit-transform:rotate(${0}deg)`
                    }
                    else{   
                    $arrowChildButton[0].style=`-webkit-transform:rotate(${90}deg)`//'color:red'//
                    }
                    //$arrowChildButton[0].style=`-webkit-transform:rotate(${90})`

                    if($Childelement[0].style.display==='none'){
                        

                        for ( let i=0; i<$Childelement.length; i++){
                            $Childelement[i].style.display='block'
                            //$arrwbutton[i].style='-webkit-transform:rotate(90deg)'

                        }
                    }
                    else{
                        for ( let i=0; i<$Childelement.length; i++){
                            $Childelement[i].style.display='none'
                            //$arrwbutton[i].style='-webkit-transform:rotate(90deg)'

                        }
                    }

                    push(`/documents/${id}`)

                }

            else{
                push(`/documents/${id}`)
            }

        }
    }
    )

}