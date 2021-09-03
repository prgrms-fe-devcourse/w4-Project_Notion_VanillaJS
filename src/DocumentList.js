import { push } from './router.js';

export default function DocumentList({ $target, initialState, onClick }) {
    const $documentList = document.createElement('div');
    $target.appendChild($documentList);

    this.state = initialState;

    this.setState = nextState => { 
        this.state = nextState;
        this.render();
    }
    
    function recTree(doc) {
        return `
            <ul>
                ${doc.map(({id, title, documents}) => 
                    `
                    <li data-id="${id}">${title}<button class="add">+</button>${documents.length > 0 ? recTree(documents) : ""}</li>`
                ).join('')}
            </ul>
        `;
    }


    this.render = () => {
        const doc = this.state;
        $documentList.innerHTML = `<button class="add-root">새 문서 추가</button>`
        $documentList.innerHTML += recTree(doc)
    };

    this.render();

    $documentList.addEventListener('click', (e) => {
        const $li = e.target.closest('li');  

        if ($li) {
            const { id } = $li.dataset;
            onClick(id);
        }
    })
}