export default function Documents({ $target, currentState, onGetDocument, onCreateDocument }) {
    const $documents = document.createElement('div');
    this.state = currentState

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    $target.appendChild($documents);

    this.showDocumentsTree = (currnetDocuments) => {
        return `
            <ul>
                ${currnetDocuments.map(({ id, title, documents }) => 
                    `<li id='${id}'}>${title}
                        <button>
                            +
                        </button>
                        ${documents.length > 0 ? 
                            this.showDocumentsTree(documents) 
                            : ''
                        }  
                    </li>`
                ).join('')}
            </ul>
        `
    }

    this.render = () => {
        $documents.innerHTML = 
            `
                <span>홍중 워크스페이스</span>
                <button>+</button>
                ${this.showDocumentsTree(this.state)}
            `
    }

    $documents.addEventListener('click', (event) => {
        const $li = event.target.closest('li')
        const { id } = $li
        const { tagName } = event.target
        
        if (!$li) {
            throw new Error('근처 li를 찾을 수 없습니다.')
        }
        
        if (tagName === 'BUTTON') {
            onCreateDocument(id)
            onGetDocument()
        }
    })

    this.render()
}
