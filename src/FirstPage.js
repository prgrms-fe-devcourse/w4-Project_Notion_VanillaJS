export default function FirstPage({$target

}){
    const $firstPage = document.createElement('div')
    
    $firstPage.className='first'
    $target.appendChild($firstPage)



    this.setState=()=>{
        this.render()
    }

    this.render = () =>{
        const $firstPage = document.createElement('div')
    
        $firstPage.className='first'
        $target.appendChild($firstPage)
    
        $firstPage.innerHTML=`
                <input type="text" class="documentTitle"  name="title" placeholder='' value="시작하기" style="left-padding :300px "></input>
                <div class="textAreadiv">
                    <textarea name="content" class="FirstContentArea"> 
👋 Notion에 오신 것을 환영합니다!

 기본사항은 다음과 같습니다.

    - 사이드바 하단의 " ╋ 페이지 추가" 를 클릭하여 새 페이지를 추가합니다.

    - 사이드바의 페이지옆  " ╋ " 를 클릭하여 새 페이지를 추가합니다.

    - 사이드바의 페이지옆  " ▶ " 를 클릭하여 하위 페이지를 볼 수 있습니다.

    - 사이드바의 페이지옆  " ━ " 를 클릭하여 페이지를 삭제합니다.

 🗑 휴지통

    - 🗑 사이드바 하단의 " 🗑 휴지통" 을 클릭하면 삭제된 페이지들을 볼 수 있습니다.

    - 🗑 휴지통 안의 페이지옆 " ✂ " 를 클릭하여 페이지를 " 영구삭제 " 합니다.
     
    - 🗑 휴지통 안의 페이지옆 " ♻ " 를 클릭하여 페이지를 " 페이지를 수정&복구 " 합니다.

    - 🗑 휴지통 안의 하단 " 🗑 휴지통 비우기 " 를 클릭하면 휴지통내 페이지가 전부 "영구 삭제"
      됩니다.
</textarea>
                </div>
            `
            

    }
    this.deleteFirstPageRender = () => {
        const $first = $target.getElementsByClassName('first')
        $first[0].innerHTML = ''
    }

    this.render()
}