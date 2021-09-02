import { request } from "./api.js"
import Editor from "./Editor.js"
import { setItem, getItem, removeItem } from "./storage.js"

export default function PostEditPage({ $target, initialState, refreshing }) {
  const $page = document.createElement('div')
  this.state = initialState

  let postLocalSaveKey = `temp-post-${this.state.id}`
  let timer = null
  
  const editor = new Editor({
    $target :$page,
    initialState: {
      title: '',
      content: ''
    }, 
    onEditing: (post) => {
      
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSavedDate: new Date()
        })
      }, 2000)
      timer = setTimeout(async() => {
        await request(`/documents/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify(post)
        })
        console.log(post)
        removeItem(postLocalSaveKey)
        refreshing()
      },5000)
    }
  })

  this.setState = async nextState => {

    if (this.state.id !== nextState.id) {
      postLocalSaveKey = `temp-post-${nextState.id}`
      this.state = nextState
      await fetchPost()
      return
     } 
    this.state = nextState
    this.render()
    editor.setState(this.state.post)
  }

  this.render = () => {
    $target.appendChild($page)
  }
  

  const fetchPost = async () => {
    
    const { id } = this.state
    const post = await request(`/documents/${id}`)
    const tempPost = getItem(postLocalSaveKey, {
      title: '',
      content: ''
    })

    if (tempPost.tempSavedDate && tempPost.tempSavedDate > post.updatedAt)  {
      if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요? ')) {
        this.setState({
          ...this.state,
          post: tempPost
        })
        return
      }
    }
    this.setState({
      ...this.state,
      post
    })
  }


  const $moveListButton = document.createElement('button')
  $moveListButton.innerHTML = '여기에 뭐 만들지'
  $page.appendChild($moveListButton)
  $moveListButton.addEventListener('click', (e) => {
    console.log(e)
  })
}