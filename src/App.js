import {request} from './api.js';
import DocumentMenu from './DocumentMenu.js';
import DocumentPage from './DocumentPage.js';

export default function App({
  $target
}) {
  this.state = {
    docList: [],
    selectedDoc: {},
    isLoading: false,
  }

  const documentMenu = new DocumentMenu({
    $target,
    initialState : this.state,
    menuClick: async (node) => {
      const {id} = node.dataset
      await fetchDocPage(id)
    }
  })


  const documentPage = new DocumentPage({
    $target,
    initialState : this.state.selectedDoc,
    childDocClick: async (node) => {
      const {id} = node.dataset
      await fetchDocPage(id)
    }
  })

  this.setState = (nextState) => {
    console.log('nextState :>> ', nextState);
    this.state = nextState

    documentMenu.setState({
      docList: this.state.docList,
      selectedDoc: this.state.selectedDoc
    })

    documentPage.setState(this.state.selectedDoc)
  }

  this.render = () => {
  }

  const fetchDocList = async () => {
    const res = await request('/documents')
    this.setState({
      ...this.state,
      docList : res
    })
  }

  const fetchDocPage = async (id) => {
    console.log('id :>> ', id);
    const res = await request(`/documents/${id}`)
    console.log('res :>> ', res);
    this.setState({
      ...this.state,
      selectedDoc : res
    })
  }

  this.init = async() => {
    await fetchDocList()
    await fetchDocPage(this.state.docList[0].id)
  }

  this.init()

  // this.route = () => {
  //   documentMenu.setState()
  // }

  // this.route()
  
};
