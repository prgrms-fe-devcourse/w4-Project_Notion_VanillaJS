import Navigation from "./Navigation.js";
import EditPage from "./EditPage.js";
import { request } from "./api.js";
import {setItem,getItem} from "./storage.js";
import {initRouter, push} from "./router.js";

/*
* TODO
*  - 라우팅 기능 아직은 뭔가 좀 애매하므로 제대로 처리하기
*  - textarea 업그레이드
*  - css 꾸미기
* */
export default function App({ $target, initialState }) {
	/**initialState=
	 * {
	 *    documentTree:[],
	 *    documentTitle: "",
	 *    documentContent: "",
	 *    documentId: null,
	 * }
	 */
	const $page = document.createElement("div");
	$page.setAttribute("id", "page");
	$target.appendChild($page);
	$target.appendChild($page);
	this.state =initialState


	const navigation = new Navigation({
		$target: $page,
		initialState: {
			documentTree:this.state.documentTree
		},
    onClickTitle:async ($title,_id)=>{

      const doc=await request(`/${_id}`,{
        method:'GET'
      })
      push(`/${_id}`)
      editPage.setState({
        documentTitle:doc.title,
        documentContent:doc.content,
      })
      setItem('meta',{
        'title':doc.title,
        'createdAt':doc.createdAt,
        'updatedAt':doc.updatedAt,
        'id':doc.id
      })
      setItem('content',doc.content)

    },
    onClickPlus:($plusButton)=>{
      console.log($plusButton)
      let _id=$plusButton.id.substr(7) // id(숫자부분)만 추출

      const $row=document.querySelector(`#row${_id}`)
      pageGenerator($row,$plusButton,_id)
    },
    onClickDel:async ($delButton)=>{
		  let _id=$delButton.id.substr(6) // 삭제할 document id
      //del은 response없고 .. request에서 200여부는 체크해주고 보내기 때문에 별도의 확인 불필요
      await request(`/${_id}`,{
        method:'DELETE'
      })

      const _documentTree=await request('',{
        method:'GET'
      })
      // console.log(documentTree)
      const currentId=getItem('meta').id
      console.log(`target:${_id} cur:${currentId}`)
      if(currentId-_id===0){
        this.setState({
          ...this.state,
          documentTitle: '',
          documentContent: '',
          documentTree:_documentTree
        })
      }else{
        // TODO: localstorage에 저장한걸 가져오건 좀 나이브한 방법이라 좀더 괜찮은 방법을 찾는게 좋을거 같음
        const meta=getItem('meta')
        const content=getItem('content')
        this.setState({
          ...this.state,
          documentTitle: meta.title,
          documentContent: content,
          documentTree: _documentTree
        })
      }

    },
    onClickAddPage:()=>{
		  const $btn=document.querySelector('.add-page')
      const $navPage=document.querySelector('#nav-page')
		  pageGenerator($navPage,$btn)
		}
	});
	const editPage = new EditPage({
		$target: $page,
		initialState: {
		  documentTitle:'',
			documentContent:''
		},
	});
	// 새 페이지 생성 위한 모든 절차 수행 담당
	const pageGenerator=($target,$btn,parent='')=>{

    $btn.setAttribute('disabled','disabled')
    const $input=document.createElement('input')
    $input.setAttribute('style','position:relative;left:15px')
    let title
    $input.setAttribute('type','text')
    $input.setAttribute('placeholder','input title')
    $input.onkeydown= async(e)=>{
      if(e.code==='Enter'){
        title=$input.value

        // TODO 1. API에 전송 ..ok
        const res=await request('',{
          method:'POST',
          body:JSON.stringify({
            'title':title,
            'parent':parent
          })
        })
        // console.log(res)
        // console.log(res.id)
        // console.log(res.title)
        // console.log(res.createdAt)

        // TODO setState -> editPage 완전하게 구현하고 나면 밑에꺼 지우고 이거 사용해서 해야 한다.
        // this.setState({ // 첫 포스팅이기 때문에 컨텐츠는 당연히 없
        //   ...this.state,
        //   documentTitle:res.title,
        //   documentId:res.id,
        // })

        // TODO 3. local storage 초기화 ..ok
        setItem('meta',{
          "title":res.title,
          "createdAt":res.createdAt,
          "updatedAt":res.updatedAt,
          'id':res.id
        })
        setItem('content','')


        // edit page ... title, content 초기화 .. 낙관적 업데이트

        // TODO 4. history api 활용하여 routing .. ok
        push(`/${res.id}`)
        // TODO 5. 전체 트리구조 가져오기 tree setState() .. ok
        const _documentTree=await request('',{
          method:'GET'
        })
        // console.log(documentTree)


        this.setState({
          ...this.state,
          documentTitle:res.title,
          documentContent: '',
          documentTree:_documentTree
        })
        // editPage.setState({
        //   documentTitle:res.title,
        //   documentContent:''
        // })
        // navigation.setState({
        //   documentTree
        // })

        $input.remove()
        $btn.removeAttribute('disabled')
      }
      else if(e.code==='Escape'){
        $input.remove()
        $btn.removeAttribute('disabled')

      }
    }
    $target.appendChild($input)
  }


	this.setState = (nextState) => {
		this.state = nextState;
		const {documentTree,documentTitle,documentContent}=this.state
    navigation.setState({documentTree});
		editPage.setState({documentTitle,documentContent});
		// this.render();
	};


	this.route=()=>{
    const {pathname}=window.location
    if(pathname==='/'){//홈으로 왔을때 아무것도 선택 안하는 상태
      editPage.setState({
        documentTitle:'',
        documentContent:''
      })
    }
    // else if(pathname.indexOf('/posts/')===0){ // 첫 포스팅 때 사용될 url
    //   const [, ,postId]=pathname.split('/')// ex) /posts/{id}
    //   console.log('route() and ... '+postId)
    //   //TODO: 추후 어떻게 변화를 해야하는지 아직은 미정..
    // }
  }
  // TODO: 아직 정확한 용도를 파악하지 못했음 (밑에 2개)
  this.route()
  initRouter(()=>this.route())

}
