import Editor from "./Editor.js";
import { request } from "./api.js";
import WelcomePage from "./welcomePage.js";

export default function ContentSection({ $target, userName, id }) {
  const $contentSection = document.createElement('div');
  $contentSection.classList.add('flex-cc');
  $target.appendChild($contentSection);

  this.state = {
    id: id,
    title: '',
    content: '',
    documents: []
  }

  const welcomePage = new WelcomePage({
    $target: $contentSection
  });

  const getDoc = async (userName, id) => {
    return await request(userName, `documents/${id}`, {
      method: 'GET'
    });
  }

  let timer = null; 

  const editor = new Editor({
    $target: $contentSection,
    initialState: this.state,
    onEditing: (doc) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await request(this.state.userName, `documents/${doc.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: doc.title,
            content: doc.content
          })
        })
      }, 3000);
    }
  });

  this.setState = async (nextState) => {

    if (nextState.id === null) {
      welcomePage.render();
    } else { 
      welcomePage.remove();
      editor.setState(await getDoc(userName, nextState.id));
    }
  }
}