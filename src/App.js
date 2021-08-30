import Navigation from "./Navigation.js";
import EditPage from "./EditPage.js";
import { request } from "./api.js";
import {setItem,getItem} from "./storage.js";
import {initRouter, push} from "./router.js";

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

	const { documentTree, documentTitle, documentContent, documentId } =
		this.state;
	const navigation = new Navigation({
		$target: $page,
		initialState: {
			documentTree,
		},
    onClickTitle:async ($title,_id)=>{
      // console.log($title)
      // console.log(` id: ${_id}`)

      const doc=await request(`/${_id}`,{
        method:'GET'
      })
      editPage.setState({
        documentTitle:doc.title,
        documentContent:doc.content,

      })
    },
    onClickPlus:($plusButton)=>{
      console.log($plusButton)
    },
    onClickAddPage:($navPage)=>{
		  const $btn=document.querySelector('.add-page')
      $btn.setAttribute('disabled','disabled')
		  const $input=document.createElement('input')
      $input.setAttribute('style','position:relative;left:15px')
      let title
      $input.setAttribute('type','text')
      $input.setAttribute('placeholder','input title')
      $input.onkeydown= async(e)=>{
		    if(e.code==='Enter'){
		      title=$input.value
		      // console.log('enter '+title)


          // TODO 1. API에 전송 ..ok
          const res=await request('',{
            method:'POST',
            body:JSON.stringify({
              'title':title,
              'parent':null
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
          // TODO  2. edit page ... title, content 초기화
          editPage.setState({
            documentTitle:res.title,
            documentContent:''
          })
          // TODO 3. local storage 초기화
          setItem('meta',{
            "title":res.title,
            "createdAt":res.createdAt,
            "updatedAt":res.updatedAt
          })
          setItem('content','')
          // TODO 4. history api 활용하여 routing
          push(`/posts/${res.id}`)
          // TODO 5. tree setState()
          const documentTree=await request('',{
            method:'GET'
          })
          console.log(documentTree)
          navigation.setState({
            documentTree
          })

          $input.remove()
          $btn.removeAttribute('disabled')
        }
      }
      $navPage.appendChild($input)
    }
	});
	const editPage = new EditPage({
		$target: $page,
		initialState: {
		  documentTitle:'',
			documentContent:''
		},
	});
	this.setState = (nextState) => {
		this.state = nextState;
    const { documentTitle, documentContent} = this.state;
    navigation.setState({}); //add next state
		editPage.setState({}); //add next state
		this.render();
	};
	this.render = () => {};
	this.render();

	this.route=()=>{
	  // $target.innerHTML=``
    const {pathname}=window.location
    if(pathname==='/'){//홈으로 왔을때 아무것도 선택 안하는 상태
      editPage.setState({
        documentTitle:'',
        documentContent:''
      })
    }else if(pathname.indexOf('/posts/')===0){ // 첫 포스팅 때 사용될 url
      const [, ,postId]=pathname.split('/')// ex) /posts/{id}
      console.log('route() and ... '+postId)
      //TODO: 추후 어떻게 변화를 해야하는지 아직은 미정..
    }
  }
  // TODO: 아직 정확한 용도를 파악하지 못했음 (밑에 2개)
  this.route()
  initRouter(()=>this.route())
}
