import LinkButton from './LinkButton.js';

  export default function EditorBottomBar({
    $target
  }) {
    const $editorBottomBar = document.createElement('div')
    $editorBottomBar.classList.add('edit-page__bottom-bar')
    $target.appendChild($editorBottomBar)

    //setState, render()

    this.makeSubButtons = (document) => {
      if(!!document.documents.length) {
        $editorBottomBar.innerHTML = '📚 하위문서 '
  
        document.documents.forEach((subDocument) => {
          new LinkButton({
            $target: $editorBottomBar,
            initialState: subDocument,
          });
        });
      } else {
        $editorBottomBar.innerHTML = ''
      }
      
    }
  }