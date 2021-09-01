import { request } from "./api.js";
import Header from "./Header.js";
import RootList from "./RootList.js";



export default function RootPage({ $target, onPostClick }) {
  const $page = document.createElement('div')

  new Header({
    $target: $page,
    initialState: {
      name: 'jin'
    }
  })

  
  const rootList = new RootList({
    $target: $page,
    initialState: [],
    onAddChild: async (id) => {
      alert('하위 페이지를 생성합니다.')
      const bodys = {
        title: `${id}의 child 추가`,
        parent: id
      }
      await request(`/documents`, {
        method: "POST",
        body: JSON.stringify(bodys)
      })
      this.setState({
        ...this.state
      })
    },
    onDelete: async (id) => {
      const confirmDelete = confirm('지우시겠습니까?')
      if (confirmDelete === true) {
        await request(`/documents/${id}`, {
          method: "DELETE"
        }) 
        this.setState({
          ...this.state
        })
      }
    },
    onAddRoot: async (val) => {
      const bodys = {
        title: val,
        parent: null
      }
      await request('/documents', {
        method: "POST",
        body: JSON.stringify(bodys)
      })
      this.setState({
        ...this.state
      })
    },
    onPostClick
  })

  this.setState = async () => {
    const roots = await request('/documents')
    rootList.setState(roots)
    this.render()
  }

  this.render = async () => {
    $target.appendChild($page)
  }

  
}