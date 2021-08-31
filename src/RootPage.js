import { request } from "./api.js";
import Header from "./Header.js";
import RootList from "./RootList.js";



export default function RootPage({
  $target
}) {
  const $page = document.createElement('div')

  new Header({
    $target: $page,
    initialState: {
      name: 'jin'
    }
  })

  
  const rootList = new RootList({
    $target: $page,
    initialState: []
  })

  this.setState = async () => {
    const roots = await request('')
    console.log(roots)
    rootList.setState(roots)
    this.render()
  }

  this.render = async () => {
    $target.appendChild($page)
    console.log(11111111)
  }

  
}