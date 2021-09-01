import { request } from "./api.js"
import Editor from "./Editor.js"
import { setItem, getItem, removeItem } from "./storage.js"

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement('div')
  
  this.state = initialState
  console.log(this.state)

  let postLocalSaveKey = `temp-post-${this.state.id}`

  const post = getItem(postLocalSaveKey, {
    title: '',
    content: ''
  })

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
      timer = setTimeout(async() => {
        console.log(post)
        setItem(postLocalSaveKey, {
          ...post,
          saveTempDate: new Date()
        })

        // 시간 다르게 만들기 저장과 로컬 값.
        await request(`/documents/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify(post)
        })
        removeItem(postLocalSaveKey)
        
      }, 2000)
    }
  })

  this.setState = async nextState => {
    console.log(this.state, nextState)

    if (this.state.id !== nextState.id) {
      postLocalSaveKey = `temp-post-${nextState.id}`
      
      this.state = nextState
      await fetchPost()
      return
     } 
    // else {
    //   this.setState({
    //     ...this.state
    //   })
    // }
    
    this.state = nextState
    this.render()
    console.log(this.state)
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

    if (tempPost.saveTempDate && tempPost.saveTempDate > post.updatedAt)  {
      console.log('왜안대~')
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
}