import LinkButton from './LinkButton.js';
/*
{
  id: 5057, 
  title: "안녕 저는 김민정입니다. ㄹㅇㄹㄴㅇㄹㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ", 
  createdAt: "2021-08-31T18:04:15.392Z", 
  updatedAt: "2021-09-01T14:04:23.310Z", 
  content: "ㅇㄹㄴㄹㅇㄴㄹ", 
  documents: ...
  …}
 */

  export default function EditorBottomBar({
    $target
  }) {
    const $editorBottomBar = document.createElement('nav')
    $target.appendChild($editorBottomBar)

    //setState, render()

    this.makeSubButtons = (document) => {
      $editorBottomBar.innerHTML = ''

      document.documents.forEach((subDocument) => {
        new LinkButton({
          $target: $editorBottomBar,
          initialState: subDocument,
        });
      });
      
    }


  }