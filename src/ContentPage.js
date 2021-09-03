import { request } from "./api.js";
import { pushRoute } from "./router.js";
import Editor from "./Editor.js";

export default function ContentPage({ $target }) {
  const $contentPage = document.createElement('div');
  $contentPage.className = 'contentPage';

  $target.appendChild($contentPage);

  let timer = null;
  const editor = new Editor({
    $target: $contentPage,
    initialState: {
      id: '',
      title: '',
      content: '',
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async() => {
          const putDocument = {
            'title': document.title,
            'content': document.content
          }
          await request(`/documents/${document.id}`, {
            method: 'PUT',
            body: JSON.stringify(putDocument)
          });
      
        const { pathname } = window.location;
        const [, , documentId] = pathname.split('/');

        pushRoute(`/documents/${documentId}`);
      }, 1000);
    }
  })

  this.setState = async ({ documentId, parentId }) => {
    if (documentId === 'new') {
      const newDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          "title": "",
          "parent": parentId
        })
      })

      pushRoute(`/documents/${newDocument.id}`);
    } else if (documentId !== '/') {
      const document = await request(`/documents/${documentId}`);

      editor.setState({
        ...document,
        content: (document.content ? document.content : '')
      });
    }
  }
}