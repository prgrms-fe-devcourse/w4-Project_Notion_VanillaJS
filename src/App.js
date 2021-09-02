import {request} from './api.js';
import DocumentMenu from './DocumentMenu.js';
import DocumentPage from './DocumentPage.js';
import {parse} from './querystring.js';

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
      await history.pushState(null, null, `/?selectedDocId=${id}`)
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

  const init = async() => {
    const res = await request(`/documents`)
    await fetchDocPage(res[0].id)
    this.setState({
      ...this.state,
      docList : res
    })
  }

  const docPopstate = () => {
    //url에 특정사용자를 나타내는 값이 있을 때
    const { search } = location

    if (search.length > 0) {
      const {selectedDocId} = parse(search.substring(1))
      console.log('selected :>> ', selectedDocId);

      if (selectedDocId) {
       fetchDocPage(selectedDocId)
      }
    }
  }

  init()
  docPopstate()

  // this.route = () => {
  //   documentMenu.setState()
  // }

  // this.route()
  window.addEventListener('popstate', () => {
    docPopstate()
  })

};
