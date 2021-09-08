export default function Editor({$target,
    initialState={
    title:'',
    content:'',
    parent:''},
    onEditing
}){

    

    let isinitialize=false


    this.state=initialState
    const $editor=$target
    $editor.className='editor'


    this.setState=(nextState)=>{
        this.state=nextState
        $editor.querySelector('[name=title]').value=this.state.title
        $editor.querySelector('[name=content]').value=this.state.content
        this.render()
    }

    this.render = () =>{
        if(!isinitialize){
        $editor.innerHTML=`
                <input type="text" class="documentTitle"  name="title" placeholder='제목 없음' value="${this.state.title}"></input>
                <div class="textAreadiv">
                    <textarea name="content" class="ContentArea" style="width:600px; height:500px;">${this.state.content}</textarea>
                </div>
            `
            
        isinitialize=true
        }
    }
    this.render()

    $editor.addEventListener('keyup',e=>{

        const {target} =e
        
        const name = target.getAttribute('name')

        if(this.state[name] !== undefined){
            const nextState={
                ...this.state,
                [name]:target.value
            }
            
                     
            this.setState(nextState)
            onEditing(this.state)
        }

        })
}