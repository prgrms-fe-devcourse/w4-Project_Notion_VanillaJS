export default function Editor({$target,
    initialState={
    title:'',
    content:'',
    parent:''},
    onEditing
}){

    
    //const $editor = document.createElement('div')

    let isinitialize=false


    this.state=initialState
    //$target.appendChild($editor)
    const $editor=$target
    $editor.className='editor'


    this.setState=(nextState)=>{
        //console.log(nextState);
        this.state=nextState
        $editor.querySelector('[name=title]').value=this.state.title
        $editor.querySelector('[name=content]').value=this.state.content
        //$editor.querySelector('[name=parent]').value=this.state.parent
        console.log(this.state)
        this.render()
    }

    this.render = () =>{
        //console.log(this.state)
        if(!isinitialize){
        $editor.innerHTML=`
                <input type="text" class="documentTitle"  name="title" placeholder='제목 없음' value="${this.state.title}"></input>
                <div class="textAreadiv">
                    <textarea name="content" class="ContentArea" style="width:600px; height:500px;">${this.state.content}</textarea>
                </div>
            `
            
        isinitialize=true
        //console.log('editor initialize')
        }
    }
    this.render()

    $editor.addEventListener('keyup',e=>{

        const {target} =e
        
        const name = target.getAttribute('name')
        console.log(name)

        if(this.state[name] !== undefined){
            const nextState={
                ...this.state,
                [name]:target.value
            }
            
                     
            this.setState(nextState)
            console.log(this.state)  
            onEditing(this.state)
        }

        })
}