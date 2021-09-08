export default function Documents({ $target, currentState, 
    onGetDocument, onCreateDocument, makeEditor, onPushRoute }) {
    const $documents = document.createElement('div');

    this.state = currentState
  
    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    const { documentsInfos } = this.state;

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
                            this.showDocumentsTree(documents, id) 
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
                ${this.showDocumentsTree(documentsInfos)}
            `
    }

    $documents.addEventListener('click', (event) => {
        const $li = event.target.closest('li')
        
        const { tagName } = event.target

        if (!$li) {
            if (documentsInfos.length === 0) {
                onCreateDocument()
                onGetDocument()
                return 
            }

            console.log('근처 li를 찾을 수 없습니다.')
        } else {
            const documentId = $li.id
            history.pushState(null, null, `/documents/${documentId}`)
            onPushRoute(`/documents/${documentId}`)
        }

        if (tagName === 'BUTTON') {
            onCreateDocument($li.id)
            onGetDocument()
        }
    })

    this.render()
}
