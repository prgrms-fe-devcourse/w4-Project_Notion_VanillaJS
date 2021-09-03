import { push } from "./router.js"

export default function LinkButton({
    $target,
    initialState,
    
})
{
    this.state=initialState
    const $linkButton = document.createElement('button')
    $linkButton.className=this.state.buttonClassName

    $target.appendChild($linkButton)
    
    this.render=()=>{
        $linkButton.textContent = this.state.text
        $linkButton.className=this.state.buttonClassName
    }

    this.render()

    $linkButton.addEventListener('click', ()=>{
        push(this.state.link)
    })
}