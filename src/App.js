import {request} from './api.js';
import DocumentMenu from './DocumentMenu.js';
import DocumentPage from './DocumentPage.js';

export default function App({
  $target
}) {
  
  const documentMenu = new DocumentMenu({
    $target,
    initialState : [],
    menuClick: async (node) => {
      const {id} = node.dataset
      const res = await request(`/documents/${id}`)
      documentPage.setState(res)
    }
  })

  const documentPage = new DocumentPage({
    $target,
    initialState : {}
  })

  this.route = () => {
    documentMenu.setState()
  }

  this.route()
  
};
