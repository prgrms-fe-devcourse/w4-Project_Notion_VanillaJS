import Editor from "./Editor.js";
import {setItem, getItem} from "./storage.js";
import {request} from "./api.js";

export default function EditPage({$target, initialState}) {
  this.state = initialState;
  /**
   * initialState format
   * documentTitle:'',
   documentContent:'',
   *
   */
  const $editPage = document.createElement("div");
  $editPage.setAttribute("id", "edit-page");
  $target.appendChild($editPage);


  const $modal = document.createElement('div')
  $modal.setAttribute('class', 'notice')
  // $modal.style.opacity='0'
  $target.appendChild($modal)


  let timer
  const editor = new Editor({
    $target: $editPage,
    initialState: {
      documentTitle: this.state.documentTitle,
      documentContent: this.state.documentContent
    },
    onEditing: (post) => {
      if (timer != null) {
        clearTimeout(timer)

      }
      timer = setTimeout(async () => {
        const _meta = getItem('meta')

        setItem('meta', {
          ..._meta,
          title: post.documentTitle,
          updatedAt: new Date()
        })
        setItem('content', post.documentContent)

        const _id = _meta.id
        await request(`/${_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            "title": post.documentTitle,
            "content": post.documentContent
          })
        })

        $modal.innerHTML = `${post.documentTitle} 이(가) 서버에 저장되었습니다`
        $modal.classList.add('on')

        setTimeout(() => {
          $modal.classList.remove('on')

        }, 2300)
        console.log(`저장 정보\ntitle:${post.documentTitle}\ncontent:${post.documentContent}`)
        // console.log(`${_id}가 서버에 저장 되었습니다`)
      }, 2000)
    }
  })

  // $editPage.appendChild($editTitle)
  // $editPage.appendChild($editContent)

  this.setState = (nextState) => {
    this.state = nextState;
    // this.render()
    editor.setState(nextState)
  };


}
