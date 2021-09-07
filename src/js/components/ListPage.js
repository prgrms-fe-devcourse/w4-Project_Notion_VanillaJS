import api from '../api/index.js';
import notionRouter from '../main.js';
import CreateRootDoc from './CreateRootDoc.js';
import DocumentList from './DocumentList.js';
import Header from './Header.js';

const ListPage= class {
  $target;
  props;

  headerComponent;
  //docListComponent;
  createRootDocComponent;

  constructor($target, props) {
    this.$target = $target;
    this.props = props
    this.init()
  }

  async init() {
    const rootDocuments = await api.getAllDocs();
    this.state = {
      rootDocuments,
      selectedId: null
    }
    
    this.render()
    this.mount()
  }
  
  async setState(newState) {
    const rootDocuments = await api.getAllDocs();
    this.state = {
      ...newState,
      rootDocuments
    }
    this.docListComponent.setState({...newState, rootDocuments})
  }
  
  template() {
    return `
      <header class="list-header js-title"></header>
      <nav class="document-list js-documents-list"></nav>
      <div class="new-doc-create-btn js-create-root-doc"></div>
    `
  }

  render() {
    this.$target.innerHTML = this.template()
  }

  mount() {
    const {selectDoc, createDoc, deleteDoc} = this
    const $header = this.$target.querySelector('.js-title');
    const $documentList = this.$target.querySelector('.js-documents-list');
    const $createRootDoc = this.$target.querySelector('.js-create-root-doc');
  
    this.headerComponent = new Header(
      $header,
    )

    this.docListComponent = new DocumentList(
      $documentList,
      {
        state: this.state,
        onSelect: selectDoc.bind(this),
        onCreate: createDoc.bind(this),
        onDelete: deleteDoc.bind(this) 
      }
    )
    
    this.createRootDocComponent = new CreateRootDoc(
      $createRootDoc,
      {
        onCreate: createDoc.bind(this),
      }
    ) 
  }

  selectDoc(docId) {
    notionRouter.push(`/documents/${docId}`)
  }

  async createDoc(parentId = null) {
    const newDoc = {
      title: '',
      parent: parentId
    }
    const { id }  = await api.create(newDoc);
    const updatedRootDocs = await api.getAllDocs() 
    const newState = {
      rootDocuments: updatedRootDocs,
      selectedId: id
    }
    this.setState(newState);
    notionRouter.push(`/documents/${id}`)
  }

  async deleteDoc(docId) {
    await api.delete(docId);
    const updatedRootDocs = await api.getAllDocs()

    const newState = {
      rootDocuments: updatedRootDocs,
      selectedId: null,
    }
    this.setState(newState);
    notionRouter.push(`/`)
  }
}

export default ListPage
