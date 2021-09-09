import makePage from './listPage.js'
import { push } from './router.js'
export default function PostList({
    $target,
    initialState,
    removeList,
    addNewList,
    addInheritList
}){
    const $postList = document.createElement('ul')
    $target.appendChild($postList)
    const $addNewListButton = document.createElement('form')
    $target.appendChild($addNewListButton)

    $addNewListButton.innerHTML = `<input placeholder="+새로 추가하기"/>`
    $addNewListButton.classList.add('addNewButton')

    this.state = initialState
    
    this.setState = nextState =>{
        this.state = nextState
        this.render()

    }
    

    this.render = () => {
        
        $postList.innerHTML=`
        ${this.state.map(post=>`
            <li data-id="${post.id}" class="link">
            <section class="list-area">
            <div class="text-area">
                <button name="inheritArrow">▶︎</button>
                <span class="link">${post.title}</span>
                <span class="forAddInput"></span>
            </div>
            <div class="editButtons">
                <button name="removeButton">x</button>
                <button name="addInheritButton">+</button>
            </div>
            </section>
               ${DFS(post)} 
            </li>
            
            
        `).join('')}
        `
    }
    
    const DFS = (post) => {
        if(!post.documents){
            return ''
        }
        if(post.documents){
            return `
                
                <ul class="child-list" style="display:none">
                ${post.documents.map(list=> `
                    <li data-id="${list.id}" class="link under-child">
                    <section class="list-area">
                    <div class="text-area">
                        <button name="inheritArrow">▶︎</button>
                        <span class="link">${list.title}</span>
                        <span class="forAddInput"></span>
                    </div>
                    <div class="editButtons">
                        <button name="removeButton">x</button>
                        <button name="addInheritButton">+</button>
                    </div> 
                    </section>
                    ${DFS(list)}
                    </li>
                    
                    
                
                `).join('')}
                </ul>
            `
        }
    }

    

    $postList.addEventListener('click', (e)=>{
        const targetedList = e.target

        if(targetedList.name === 'removeButton'){
            const {id} = targetedList.closest('li').dataset
            removeList(id)
        } 
        if(targetedList.name === 'addInheritButton'){
            const inheritInput = document.createElement('form')
            const target = targetedList.closest('li')
            const inputPlace = target.querySelector('.forAddInput')
            inputPlace.appendChild(inheritInput)
            inheritInput.innerHTML=`
            <input placeholder='+추가하기'/>
            `
            inheritInput.addEventListener('submit',(e)=> {
                e.preventDefault()
                const content = {
                    title:inheritInput.querySelector('input').value,
                    id : targetedList.closest('li').dataset.id
                }
                addInheritList(content)
                inheritInput.querySelector('input').value = ''
            })
        }
        if(targetedList.name === 'inheritArrow'){
            const parent = targetedList.closest('li')
            const child = parent.querySelector('.child-list')
            const defaultWidth = parent.clientWidth - 60
            targetedList.style.transition = 'transform 0.3s ease-in-out'
                if(child.style.display === 'none'){
                child.style.display = 'block'
                targetedList.style.transform = 'rotate(90deg)'
            }else {
                child.style.display = 'none'
                targetedList.style.transform = 'rotate(0deg)'
            }
            const underChild = child.querySelectorAll('li')
            for(let i=0;i<underChild.length;i++){
                underChild[i].style.width = defaultWidth + 'px'
            }
            
            
        } 

        if(targetedList.className === 'link'){
            const {id} = targetedList.closest('li').dataset
            push(`/list/${id}`)
        }
    
    })

    $addNewListButton.addEventListener('submit', (e)=>{
        e.preventDefault()

        const content = $addNewListButton.querySelector('input').value
        addNewList(content);

        $addNewListButton.querySelector('input').value = ''

    })
    
    this.render()
}
