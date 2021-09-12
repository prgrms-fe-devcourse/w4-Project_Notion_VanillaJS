import { push } from "./router.js";

export default function DocsList({ $target, initialState, onCreateNewDoc, onRemoveDoc }) {
    const $docsList = document.createElement('div');

    $target.appendChild($docsList);

    this.state = initialState;

    this.setState = nextState => {
        if (getDocsId(this.state.docs) !== getDocsId(nextState)) {
            this.state = {
                docs: nextState
            };
    
            this.render();
        }
    }

    const getDocsId = (docs = []) => {
        return Object.values(docs)
                    .map(({ id, documents }) => id + getDocsId(documents))
                    .join('');
    }

    this.render = () => {
        $docsList.innerHTML = `<ul id="rootDocs">${getAllDocuments(this.state.docs)}</ul>`;
    };

    $docsList.addEventListener('click', (e) => {
        const $li = e.target.closest('.each-doc');

        if ($li) {
            const { id } = $li.dataset;
            const $label = e.target.closest('.docs-title');
            const $addButton = e.target.closest('.add-btn');
            const $removeButton = e.target.closest('.remove-btn');
            
            if ($label) {
                const { pathname } = window.location;
                const selectedDocId = pathname.split('/')[2];
                
                if (selectedDocId !== id) {
                    push(`/documents/${id}`);
                }
                return;
            }
    
            if ($addButton) {
                onCreateNewDoc(parseInt(id));
                return;
            }
            
            if ($removeButton) {
                onRemoveDoc(parseInt(id));
                return;
            }
        }
    });

    const getAllDocuments = (docs) => {
        
        return docs.reduce((acc, eachDoc) => {
            acc += `<li class="each-doc" data-id=${eachDoc.id}>
                        <section class="parent">
                            <label class="docs-title">
                                <i class="doc-icon ${eachDoc.title ? 'far fa-file-alt' : 'far fa-file'}"></i>
                                ${eachDoc.title || '제목 없음'}
                            </label>
                            <section class="list-btn-group">
                                <button class="add-btn"><i class="far fa-plus-square"></i></button>
                                <button class="remove-btn"><i class="far fa-trash-alt"></i></button>
                            </section>
                        </section>
                        ${eachDoc.documents.length > 0 
                            ? `<ul class="sub-docs">${getAllDocuments(eachDoc.documents)}</ul>` 
                            : ''
                        }
                    </li>`;
            return acc;
        }, ``);
    };

    this.render();
}
