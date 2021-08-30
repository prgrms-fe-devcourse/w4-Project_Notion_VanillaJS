import { getItem, removeItem, setItem } from '../Storage.js'
import { request } from '../api.js'
import Editor from './Editor.js'

// PageEdit 페이지의 역할은 무엇일까?
// 상황에 맞는 Editor를 출력하고, 데이터를 불러와서 보여주는 역할을 수행?
export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement('div')

  this.state = initialState

  let postLocalSaveKey = `temp-post-${this.state.postId}`

  const post = getItem(postLocalSaveKey, {
    title: '',
    content: '',
  })

  let timer = null

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: async (post) => {
      // debounce
      if (timer !== null) {
        clearTimeout(timer)
      }

      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        })

        const isNew = this.state.postId === 'new'

        if (isNew) {
          const createdPost = await request('/documents', {
            method: 'POST',
            body: JSON.stringify(post),
          })

          history.replaceState(null, null, `/documents/${createdPost.id}`)
          removeItem(postLocalSaveKey)
          this.setState({
            postId: createdPost.id,
          })
        } else {
          // 기존에 존재하는 포스트의 경우
          await request(`/documents/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
          })
          removeItem(postLocalSaveKey)
        }
      }, 1000)
    },
  })

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState
      postLocalSaveKey = `temp-post-${this.state.postId}`
      await fetchPost()
      return
    }

    this.state = nextState
    this.render()
    editor.setState(
      this.state.post || {
        title: '',
        content: '',
      },
    )
  }

  this.render = () => {
    $target.appendChild($page)
  }

  const fetchPost = async () => {
    const { postId } = this.state

    if (postId !== 'new') {
      const post = await request(`/documents/${postId}`)
      const tempPost = getItem(postLocalSaveKey, {
        title: '',
        content: '',
      })

      if (tempPost.tempSaveDate && post.created_at < tempPost.tempSaveDate) {
        if (confirm('저장되지 않은 데이터가 있씁니다. 불러올까요?')) {
          this.setState({
            ...this.state,
            post: tempPost,
          })
          return
        }
      }

      this.setState({
        ...this.state,
        post,
      })
    }
  }
}
