import Editor from "./editor.js";
import Profile from "./profile.js";
import Documents from "./documents.js";
import { request } from "./api.js"
import NewDocument from "./newdocument.js";

export default function App ({ 
  $target, 
  initialState = [
    {
      "id": "new",
      "title": "Untitled",
      "documents": []
    }
  ] 
}) {

  this.state = initialState;
  this.setState = async () => {
    const posts = await request ('/documents')
    this.state = posts
    documents.setState(posts)
    console.log(this.state)
  }

  this.setState()

  const sideBar = document.createElement('div')
  sideBar.className = 'side-bar'
  $target.appendChild(sideBar)

  new Profile ({
    $target: sideBar,
    username: "gyulhana",
    quote: `I wanna fall in love<br>with you forever ✨`
  })

  const documents = new Documents ({
    $target: sideBar,
    initialState,
    onFold: (list) => {
      // 폴드 버튼을 누르면 해당 객체에서 document를 탐색해서 반환하고
      // 그걸 li로 생성함
      // 누를 때마다 하위에 documents가 있는지 판단해서 생성함
      console.log(`${list.dataset.id} folded`); 
      console.log(this.state)
    },
    onCreate: async (list) => {
      const createdPost = await request('/documents', {
        method: 'POST',
        body: JSON.stringify(this.state)
      })
      this.setState()
      history.replaceState(null, null, `/documents/${createdPost.id}`)
      console.log(`${list.dataset.id} create new document`); 
    },
    onEdit: async (list) => {
      if (list.dataset.id === "new") {
        const createdPost = await request('/documents', {
          method: 'POST',
          body: JSON.stringify(this.state)
        })
        this.setState()
        history.replaceState(null, null, `/documents/${createdPost.id}`)
      } else {
        const editedPost = await request('/documents', {
          method: 'PUT',
          body: JSON.stringify(this.state)
        })
        this.setState()
        history.replaceState(null, null, `/documents/${list.dataset.id}`)
      }
      console.log(`${list.dataset.id} now editing`);
    }
  })

  const editor = new Editor({
    $target,
  })
}