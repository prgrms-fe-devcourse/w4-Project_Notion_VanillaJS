import PostsList from './PostsList.js'
import Header from './Header.js'
import { request } from './api.js'

export default function PostsPage ({ $target, initialState, onClick }) {
    const $postsPage = document.createElement('div')
    this.state = initialState

    new Header ({
        $target: $postsPage
    })

    const postsList = new PostsList ({
        $target: $postsPage,
        initialState: initialState,
        onAdd: async (id) => {
            const post = await request('/documents', {
                method : 'POST',
                body : JSON.stringify({
                    title: '새 페이지',
                    parent: id
                })
            })
            if(id !== 'null') {
                post['documents'] = []
                this.state.map(list => findParentId(list, id)).filter(list => list)[0].documents.push(post)
                this.setState(this.state)
            } else {
                this.setState([
                    ...this.state,
                    {
                        id: post.id,
                        title: post.title,
                        createdAt: post.createdAt,
                        updatedAt: post.updatedAt,
                        documents: []
                    }
                ])
            }
        },
        onRemove: async(id) => {
            await request(`/documents/${id}`, {
                method: 'DELETE'
            })
            fetchPosts()
        },
        onClick,
    })

    this.onChange = (nextState) => {
        const { id, title } = nextState
        this.state.map(list => findParentId(list, id)).filter(list => list)[0].title = title
        this.setState(this.state)
    }


    const fetchPosts = async () => {
        const posts = await request("/documents");
        this.setState(posts);
      };

    const findParentId = (post, id) => {
        let parent
        if (post.id == id) return post

        if (post.documents.length === 0) return false
        
        for (const child of post.documents) 
            if((parent = findParentId(child, id))) return parent
        
        return false;
    };

    this.setState = (nextState) => {
        this.state = nextState
        postsList.setState(nextState)
        this.render()
    }

    this.render = () => {
        $target.appendChild($postsPage)
    }

    fetchPosts()

}