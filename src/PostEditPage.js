import { request } from "./api.js"
import { setItem,getItem,removeItem } from "./storage.js"
import Editor from "./Editor.js"
import LinkButton from "./LinkButton.js"
import { push } from "./router.js"
import PostsPage from "./PostsPage.js"

export default function PostEditPage({
    $target,
    initialState
}) {

    const $page = document.createElement('div')

    this.state = initialState

    let postLocalSaveKey = `temp-post-${this.state.postId}`

    const postPage=new PostsPage({
        $target,
        initialState:[]
    })

    const post = getItem(postLocalSaveKey, {
        title: '',
        content:'',
        parent: null
    })

    let timer = null

    const editor = new Editor({
        $target:$page,
        initialState: post,
        onEditing: (post) => {
            if (timer !== null) {
                clearTimeout(timer) //1초사이에 들어오는 연속잡업을 민다.
            }
            timer = setTimeout(async () => {
                setItem(postLocalSaveKey, {
                    ...post,
                    tempSaveDate: new Date()
                })

                const isNew = this.state.postId === 'new'
                if (isNew) {
                    console.log(post)
                    const createdPost = await request('/documents', {
                        method: 'POST',
                        body: JSON.stringify(post)

                    })

                    removeItem(postLocalSaveKey)
                    history.replaceState(null, null, `/documents/${createdPost.id}`)
                    push('/')
                    history.pushState(null, null, `/documents/${createdPost.id}`)
                    console.log(this.state)
                    this.setState({
                        postId:createdPost.id,
                        parent:createdPost.parent
                        
                    })
                    console.log(this.state)
                    console.log('???')


                } else {
                    await request(`/documents/${post.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })
                    removeItem(postLocalSaveKey)

                }
            }, 2000) 

        }
        
    })

    this.setState = async nextState => {
        console.log(nextState)
        if (this.state.postId !== nextState.postId) {
            postLocalSaveKey = `temp-post-${nextState.postId}`
            this.state = nextState

            if (this.state.postId === 'new') {
                console.log(this.state.parent)
                if (this.state.parent === undefined && this.state.decodeRetitle===undefined) {
                    const post = getItem(postLocalSaveKey, {
                        title: '',
                        content: '',
                        parent: null
                    })
                    console.log(post)

                    this.render()
                    editor.setState(post)
                }
                else if (this.state.parent === undefined) {
                    const post = getItem(postLocalSaveKey, {
                        title: nextState.decodeRetitle,
                        content: '',
                        parent: null
                    })
                    console.log(post)
                    this.render()
                    editor.setState(post)
                }
                else{
                    const post = getItem(postLocalSaveKey, {
                        title: '',
                        content: '',
                        parent: nextState.parent
                    })
                    console.log(post)
                    this.render()
                    editor.setState(post)
                }
            }
            else{
                await fetchPost()
            }
            return
        }
        console.log(nextState)
        this.state = nextState
        this.render()
        //editor.render()
        console.log(this.state.post)

        //editor.render()

        editor.setState(this.state.post || {
            title:'',
            content:'',
            parent: null
        })
    }

    this.render = () => {
        //editor.render()
        $target.appendChild($page)
    }
    this.render()

    const fetchPost = async () => {
        
        
        const {postId} = this.state
        if (postId !== 'new') {
            const post = await request(`/documents/${postId}`)

            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: '',
                parent: null
            })

            if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
                if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
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
                
            },
            
            )

        }
    }

    new LinkButton({
        $target:$page,
        initialState:{
            text:'🏠홈',
            link:'/',
            buttonClassName:'refreshButton'        
        }
    })
}