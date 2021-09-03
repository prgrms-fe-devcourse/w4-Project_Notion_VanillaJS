import api from '../api/index.js';
import Component from '../core/Component.js';
import { push } from '../core/Router.js';
import CreateRootDoc from './CreateRootDoc.js';
import DocumentList from './DocumentList.js';
import Header from './Header.js';

const ListPage= class {
  $target;
  props;

  headerComponent;
  docListComponent;
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
  
  setState(newState) {
    this.state = newState
    this.docListComponent.setState(newState)
  }
  
  setId(id) {
    
  }

  template() {
    return `
      <header class="js-title"></header>
      <button class="js-create-root-doc" style="width: 100%; height: 100px;  border: solid 1px; font-size: 10px;"></button>
      <nav class="js-documents-list"></nav>
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
    push(`/documents/${docId}`)
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
    push(`/documents/${id}`)
  }

  async deleteDoc(docId) {
    await api.delete(docId);
    const updatedRootDocs = await api.getAllDocs()

    const newState = {
      rootDocuments: updatedRootDocs,
      selectedId: null,
    }
    this.setState(newState);
    push(`/`)
  }
}

export default ListPage
