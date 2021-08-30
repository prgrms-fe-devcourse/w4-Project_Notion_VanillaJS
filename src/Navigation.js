export default function Navigation({ $target,
                                     initialState,
                                     onClickTitle,
                                     onClickPlus,
                                     onClickDel,
                                   onClickAddPage}) {
	/**
	 * initialState={
	 *    documentTree:[]
	 * }
	 *
	 *
	 */
	this.state = initialState;
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};
  let isInit=true

	const $navPage = document.createElement("div");
	$navPage.setAttribute("id", "nav-page");
	$target.appendChild($navPage);


	this.render = () => {
		const { documentTree } = this.state;
		$navPage.innerHTML =`
		${openDocumentTree(documentTree)}
		`

      const $carots=document.querySelectorAll('.doc-carot')
      $carots.forEach(carot=>{
        carot.addEventListener('click',(e)=>{
          carot.classList.toggle('open')
        
        })
        
      })


    const $btnAddPage=document.createElement('button')
    $btnAddPage.setAttribute('class','add-page')
    $btnAddPage.innerText="페이지 추가"
    $navPage.appendChild($btnAddPage)
  }
	this.render();

	// $navPage.addEventListener("click", (e) => {
  //   const $li=e.target.closest(".doc-li")
	// 	const $carot = e.target.closest(".doc-carot");
	// 	const $title = e.target.closest(".doc-title");
	// 	const $btnPlus = e.target.closest(".doc-plusButton");
  //   // const $subDocs=e.target.closest('.class-sub-docs')
  //   // console.log($subDocs)
  //
  //   const $btnAddPage=e.target.closest('.add-page')
  //
  //   if($carot){
  //     const _id=$li.id
  //     const $subDocs=document.querySelector(`#sub${_id}`)
  //     if($carot.classList.contains('open')){
  //       $carot.innerHTML=`<i class="fas fa-caret-down"></i>`
  //       $subDocs.style.display='block'
  //     }else{
  //       $carot.innerHTML=`<i class="fas fa-caret-right"></i>`
  //       $subDocs.style.display='none'
  //
  //     }
  //   }else if($title){
  //     const _id=$li.id
  //     onClickTitle($title,_id)
  //   }else if($btnPlus){
  //     onClickPlus($btnPlus)
  //   }else if($btnAddPage){
  //     console.log("add page btn clicked")
  //     // TODO: router 통해 주소 라우팅 하기
  //     // editPage 새로 구성하기
  //     // api에 title, parent:null 해서 보내기
  //     // localStorage 설정..
  //   }else{
  //     console.log("빈 공간 클릭")//추후 걍 아무것도 안하게 처리하기
  //   }
  //
  //
	// 	// console.log($carot);
	// 	// console.log($title);
	// 	// console.log($plusButton);
  //   // console.log($subDocs)
	// });

	$navPage.addEventListener('click',(e)=>{
	  const $docRow=e.target.closest('.doc-row')
    const $docCarot=e.target.closest('.doc-carot')
    const $docTitle=e.target.closest('.doc-title')
    const $docPlusButton=e.target.closest('.doc-plusButton')
    const $docDelButton=e.target.closest('.doc-delButton')
    const $addPageButton=e.target.closest('.add-page')

    if($docCarot){
      const _id=$docRow.id.substr(3)

      const $subDocs=document.querySelector(`#sub${_id}`)
      if($docCarot.classList.contains('open')){
        $docCarot.innerHTML=`<i class="fas fa-caret-down"></i>`
        $subDocs.style.display='block'
      }else{
        $docCarot.innerHTML=`<i class="fas fa-caret-right"></i>`
        $subDocs.style.display='none'

      }
    } else if($docTitle){
      const _id=$docTitle.id
      onClickTitle($docTitle,_id)
    }else if($docPlusButton){
      onClickPlus($docPlusButton)
    }else if($addPageButton){
      onClickAddPage($navPage)
    }else if($docDelButton){
      onClickDel($docDelButton)
    } else{
      console.log('blank space')
    }

  })
}
const NO_PAGE=`<span style="color:gray;position: relative;left: 25px">하위 페이지가 없습니다</span>`
function openDocumentTree(documents) {
  if (documents.length === 0)
    return NO_PAGE
  return `
      <ul class="doc-ul" >
        ${documents.map(doc => `
          <div class="doc-row" id="row${doc.id}">
            <span class="doc-carot" id="${doc.id}"><i class="fas fa-caret-right"></i></span>
            <span class="doc-title" id="${doc.id}">${doc.title}</span>
            <button class="doc-delButton" id="delBtn${doc.id}">x</button>
            <button class="doc-plusButton" id="plusBtn${doc.id}" >+</button>
          </div>
          
          <li id="sub${doc.id}" style="display: none">${openDocumentTree(doc.documents)}</li>

        `).join('')}
      </ul>
    `
}



