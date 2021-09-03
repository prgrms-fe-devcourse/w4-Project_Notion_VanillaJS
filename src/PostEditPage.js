import { request } from './api.js'
import Editor from './Editor.js'
import { getItem, setItem } from './storage.js'

export default function PostEditPage({ $target, initialState }) {
    const $postEditPage = document.createElement('div')

    this.state = initialState

    // [editor 가지고 오기]
    // 로컬 스토리지에 값이 이미 있는 경우 초기 값 세팅. 키 값.
    const TEMP_POST_SAVE_KEY = 'temp-post-${this.state.postId}'

    // 새로 작성하는 페이지가 아니면 원래 있던 페이지를 불러온다. 포스트 불러오기.
    const post = getItem(TEMP_POST_SAVE_KEY, {
        title: '',
        content: ''
    })
    // debounce 처리.
    let timer = null
    const editor = new Editor({ 
        $target: $postEditPage,
        initialState: this.state.post, 
        onEditing: (post) => {
            // debounce 처리.
            if (timer !== null) {
                clearTimeout(timer)
            }
            // setTimeout 일정한 숫자값 반환
            timer = setTimeout(() => {
                setItem(TEMP_POST_SAVE_KEY, {
                    ...post,
                    // 저장시간 측정.
                    tempSaveDate: new Date()
                })
            }, 1000)
        },
    })

    this.setState = async nextState => {
        if (this.state.postId !== nextState.postId) {
            this.state = nextState
            await fetchPost()
            return 
        }

        this.state = nextState
        this.render()

        editor.setState(this.state.post)
    }

    this.render = () => {
        $target.appendChild($postEditPage)
    }
    
    // 아닌 경우.
    const fetchPost = async () => {
        const { postId } = this.state

        // 선택적 불러오기. 아이디 키 값이 있으면 수정. 아니면 새로 생성.
        if (postId !== 'new') {
            const post = await request(`/posts/${postId}`)

            this.setState({
                ...this.state,
                post
            })
        }
    }
}