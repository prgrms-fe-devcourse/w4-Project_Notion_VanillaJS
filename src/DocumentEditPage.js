import { request } from './api.js';
import Editor from './Editor.js';
//import LinkButton from './LinkButton.js';
import { getItem, removeItem, setItem } from './storage.js';

export default function DocumemtEditPage({ $target, initialState }) {
    const $page = document.createElement('div');

    this.state = initialState;

    let postLocalSaveKey = `temp-post-${this.state.docId}`;

    const doc = getItem(postLocalSaveKey, {
        title: '',
        content: ''
    });

    let timer = null

    console.log("doc:",doc);

    const editor = new Editor({
        $target: $page,
        initialState: doc,
        onEditing: (doc) => {
            if (timer !== null) { 
                clearTimeout(timer);
            }
            timer = setTimeout(async() => {
                setItem(postLocalSaveKey, {
                    ...doc,
                    tempSaveDate: new Date()
                })

                const isNew = this.state.docId === 'new'
                if (isNew) {
                    const createdPost = await request('/documents', {
                        method: 'POST',
                        body: JSON.stringify(doc)
                    })
                    history.replaceState(null, null, `/documents/${createdPost.id}`);
                    removeItem(postLocalSaveKey);

                    this.setState({
                        docId: createdPost.id,
                    })
                } else { 
                    await request(`/documents/${doc.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(doc)
                    })
                    removeItem(postLocalSaveKey);
                }
            }, 2000)
        }
    });

    this.setState = async nextState => {
        console.log(this.state.docId, nextState.docId);
        
        if (this.state.docId !== nextState.docId) {
            postLocalSaveKey = `temp-post-${nextState.docId}`;
            this.state = nextState;

            if (this.state.docId === 'new') {
                const doc = getItem(postLocalSaveKey, {
                    title: '',
                    content: ''
                });
                this.render();
                editor.setState(doc);
            } else {
                await fetchDoc();
            }
            return;
        }
        
        this.state = nextState;
        this.render();

        editor.setState(this.state.doc || {
            title: '',
            content: ''
        });
    };

    this.render = () => {
        $target.appendChild($page);
    }

    const fetchDoc = async () => {
        const { docId } = this.state;

        if (docId !== 'new') {
            const doc = await request(`/documents/${docId}`);

            //수정한 값 저장 및 불러오기 위해서---
            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: ''
            })

            if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) { //tempSaveDate가 있는 경우
                if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    });
                    return;
                }
            }
            //---
            
            this.setState({
                ...this.state,
                doc
            });
        }
    }
}