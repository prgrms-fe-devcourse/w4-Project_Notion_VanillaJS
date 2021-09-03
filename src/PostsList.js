export default function PostsList ({ $target, initialState, onAdd, onClick, onRemove }) {
    const $postsList = document.createElement('div')
    $target.appendChild($postsList)

    this.state = initialState

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    // 데이터의 계층 구조를 표현
    const makeTree = (post, str) => {
        if (post.documents.length === 0)
            return `<li data-id=${post.id} class='updatePost'>${post.title} <button data-id=${post.id} class='addPost'>+</button><button data-id=${post.id} class='removePost'>-</button></li>`

        str += `<li data-id=${post.id} class='updatePost'>${post.title} <button data-id=${post.id} class='addPost'>+</button><button data-id=${post.id} class='removePost'>-</button><ul>`
        for (const child of post.documents) {
            str += makeTree(child, '')
        }

        str += `</ul></li>`
        return str
    }

    this.render = () => {
        $postsList.innerHTML = `
        <div data-id=${null} class='updatePost'>📄 Root Page Add <button data-id=${null} class='addPost'>+</button></div>
        <ul>
        ${this.state.map(post => makeTree(post, '')).join('')}
        </ul>
        `
    }

    // this.render()

    $postsList.addEventListener('click', (e) => {
        const $addBtn = e.target.closest('.addPost')
        const $removeBtn = e.target.closest('.removePost')
        const $post = e.target.closest('.updatePost')

        if($addBtn) {
            const { id } = $addBtn.dataset
            onAdd(id)
        } else if ($removeBtn) {
            const { id } = $removeBtn.dataset
            onRemove(id)
        } else if($post) {
            const { id } = $post.dataset
            onClick(id)
        }
    })
}