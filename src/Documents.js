export default function Documents({ $target, currentState, docs }) {
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
                ${currnetDocuments.map(({ title, documents }) => 
                    `<li>${title}
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
                ${this.showDocumentsTree(this.state)}
            `
        
    }

    this.render()
}
