import DocumentList from "./DocumentList.js";
import { request } from "./api.js";
import { getItem, setItem } from "./storage.js";
import { pushRoute } from "./router.js";

export default function ControlPage({ $target }) {
  const $controlPage = document.createElement('div');
  $controlPage.className = 'controlPage';

  $target.appendChild($controlPage);

  this.state = [];
  this.toggledState = getItem('toggledDocument', []);
  this.selectedState = getItem('selectedDocument', []);

  const documentList = new DocumentList({
    $target: $controlPage,
    initialState: {
      id: '',
      title: '',
    },
    onToggle: id => {
      this.toggledState = getItem('toggledDocument', this.toggledState)
      
      if (this.toggledState.includes(parseInt(id))) {
        this.toggledState.splice(this.toggledState.indexOf(parseInt(id)), 1);
      } else {
        this.toggledState.push(parseInt(id));
      }
      
      setItem('toggledDocument', this.toggledState)
      this.setState();
    },
    onSelect: id => {
      if(!this.selectedState.length) {
        this.selectedState.push(parseInt(id));
      } else if (this.selectedState[0] !== parseInt(id)) {
        this.selectedState.splice(0, 1, parseInt(id));
      }

      setItem('selectedDocument', this.selectedState)
      pushRoute(`/documents/${id}`)
    },
    onCreateChild: id => {
      if (!this.toggledState.includes(parseInt(id))) {
        this.toggledState.push(parseInt(id));
        setItem('toggledDocument', this.toggledState);
      }

      pushRoute(`/documents/new/${id}`);
    },
    onDelete: async (id) => {
      const [, , pageId] = window.location.pathname.split('/');
      await request(`/documents/${id}`, {
        method: 'DELETE'
      });
      
      if(pageId === id || pageId === undefined) {
        if(pageId === id && this.selectedState.length) {
          this.selectedState.pop();
          setItem('selectedDocument', this.selectedState);  
        } 
        pushRoute('/')
      } else {
        this.setState();
      }
    }
  })


  this.setState = async () => {
    // 만약 nextState 가 빈값이라면? validation. 초기 디폴트값 필요
    const nextState = await request('/documents');

    this.state = nextState;

    documentList.setState(this.state, this.toggledState, this.selectedState);
  }
}