import Navigation from "./Navigation.js";
import EditPage from "./EditPage.js";
import {request} from "./api.js";
import {setItem, getItem} from "./storage.js";
import {initRouter, push} from "./router.js";

export default function App({$target, initialState}) {
  /**initialState=
   * {
   *    documentTree:[],
   *    documentTitle: "",
   *    documentContent: "",
   *    documentId: null,
   * }
   */
  this.state = initialState
  const $page = document.createElement("div");
  $page.setAttribute("id", "page");
  $target.appendChild($page);

  const $modal = document.createElement('div')
  $modal.setAttribute('class', 'notice')
  $page.appendChild($modal)

  // navigation section
  const navigation = new Navigation({
    $target: $page,
    initialState: {
      documentTree: this.state.documentTree
    },
    onClickTitle: async ($title, id) => {
      const doc = await request(`/${id}`, {
        method: 'GET'
      })

      editPage.setState({
        documentTitle: doc.title,
        documentContent: doc.content,
      })
      //현재 상태 localStorage에 저장
      setItem('meta', {
        'title': doc.title,
        'createdAt': doc.createdAt,
        'updatedAt': doc.updatedAt,
        'id': doc.id
      })
      setItem('content', doc.content)

      // history update
      push(`/${id}`)
    },
    onClickPlus: ($plusButton) => {
      let id = $plusButton.id.substr(7) // id(숫자부분)만 추출
      const $row = document.querySelector(`#row${id}`)
      pageGenerator($row, $plusButton, id)
    },
    onClickDel: async ($delButton) => {
      let targetId = $delButton.id.substr(6)
      await request(`/${targetId}`, {
        method: 'DELETE'
      })
      const documentTree = await request('', {
        method: 'GET'
      })
      const currentId = getItem('meta').id
      if (currentId - targetId === 0) {// 지우는 도큐먼트와 지금 도큐먼트가 일치하는 경우
        this.setState({
          ...this.state,
          documentTitle: '',
          documentContent: '',
          documentTree
        })
      } else {// 지우는 도큐먼트와 지금 도큐먼트가 일치하지 않는 경우
        const meta = getItem('meta')
        const content = getItem('content')
        this.setState({
          ...this.state,
          documentTitle: meta.title,
          documentContent: content,
          documentTree
        })
      }

    },
    onClickAddPage: () => {
      const $btn = document.querySelector('.add-page')
      const $navPage = document.querySelector('#nav-page')
      pageGenerator($navPage, $btn)
    }
  });


  // Editor section
  let timer
  const editPage = new EditPage({
    $target: $page,
    initialState: {
      documentTitle: '',
      documentContent: ''
    },
    onEditing: (post) => {
      if (timer != null) {
        clearTimeout(timer)

      }
      // debounce 기법을 활용하여 서버에 실시간 저장(2초동안 입력 없는 경우)
      timer = setTimeout(async () => {

        saveDocInLocalStorage(post)
        await saveDocInServer(post)
        showMessage(post, $modal) // 이용자에게 server저장 여부 피드백
        console.log(`저장 정보\n title:${post.documentTitle}\n content:${post.documentContent}`)

        // 전체 status update
        const _documentTree = await request('', {
          method: 'GET'
        })
        const title = getItem('meta').title
        const content = getItem('content')
        this.setState({
          ...this.state,
          documentTitle: title,
          documentContent: content,
          documentTree: _documentTree
        })
      }, 2000)
    }
  });

  const saveDocInServer = async post => {
    const {id} = getItem('meta')
    await request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        "title": post.documentTitle,
        "content": post.documentContent
      })
    })
  }
  const saveDocInLocalStorage = post => {
    const meta = getItem('meta')
    setItem('meta', {
      ...meta,
      title: post.documentTitle,
      updatedAt: new Date()
    })
    setItem('content', post.documentContent)
  }
  const showMessage = (post, $modal) => {
    $modal.innerHTML = `${post.documentTitle} 가(이) 서버에 저장되었습니다`
    $modal.classList.add('on')
    setTimeout(() => {
      $modal.classList.remove('on')
    }, 2300)
  }

  // 새 도큐먼트 생성
  const pageGenerator = ($target, $btn, parent = '') => {

    // 중복 생성을 방지하기 위해 클릭 이후 버튼 비활성화
    $btn.setAttribute('disabled', 'disabled')
    const $input = createInput()

    let title
    $input.onkeydown = async (e) => {
      if (e.code === 'Enter') {
        title = $input.value
        const res = await request('', {
          method: 'POST',
          body: JSON.stringify({
            'title': title,
            'parent': parent
          })
        })
        // localStorage에 현재 도큐먼트 정보 저장
        setItem('meta', {
          "title": res.title,
          "createdAt": res.createdAt,
          "updatedAt": res.updatedAt,
          'id': res.id
        })
        setItem('content', '')
        const _documentTree = await request('', {
          method: 'GET'
        })

        // navigation, editor에 모두 변동사항 있으므로 전체 state update
        this.setState({
          ...this.state,
          documentTitle: res.title,
          documentContent: '',
          documentTree: _documentTree
        })
        push(`/${res.id}`)
        $input.remove()
        $btn.removeAttribute('disabled')
      } else if (e.code === 'Escape') {
        $input.remove()
        $btn.removeAttribute('disabled')

      }
    }
    $target.appendChild($input)
  }
  const createInput = () => {
    const $input = document.createElement('input')
    $input.setAttribute('style', 'position:relative;left:15px')
    $input.setAttribute('type', 'text')
    $input.setAttribute('placeholder', 'input title..')
    $input.style.height = '30px'
    $input.style.width = '200px'
    $input.style.fontSize = '20px'
    return $input
  }

  this.setState = (nextState) => {
    this.state = nextState;
    const {documentTree, documentTitle, documentContent} = this.state
    navigation.setState({documentTree});
    editPage.setState({documentTitle, documentContent});
  };


  this.route = () => {
    const {pathname} = window.location
    if (pathname === '/') {
      editPage.setState({
        documentTitle: '',
        documentContent: ''
      })
    }

  }
  this.route()
  initRouter(() => this.route())

}
