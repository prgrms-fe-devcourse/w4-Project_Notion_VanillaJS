export default function FirstPage({$target

}){
    const $firstPage = document.createElement('div')
    
    //const $postList=$target
    $firstPage.className='first'
    $target.appendChild($firstPage)



    this.setState=()=>{
        //console.log(nextState);
        this.render()
    }

    this.render = () =>{
        const $firstPage = document.createElement('div')
    
        //const $postList=$target
        $firstPage.className='first'
        $target.appendChild($firstPage)
    
        //console.log(this.state)
        $firstPage.innerHTML=`
                <input type="text" class="documentTitle"  name="title" placeholder='' value="시작하기" style="left-margin:300px float:left"></input>
                <div class="textAreadiv">
                    <textarea name="content" class="ContentArea" style="width:600px; height:600px;">👋 Notion에 오신 것을 환영합니다!</textarea>
                </div>
            `
            

    }
    this.deleteRender = () =>{
            // const $app=document.getElementsByClassName('app')
            // const $first=$target.getElementsByClassName('first')
            // console.log($app)
            // console.log($first)
            // $app[0].removeChild($first)
    
        $firstPage.innerHTML=` `
            

    }
    this.render()
}