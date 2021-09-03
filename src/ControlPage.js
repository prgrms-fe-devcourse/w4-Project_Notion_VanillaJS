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

  const documentList = new DocumentList({
    $target: $controlPage,
    initialState: {
      id: '',
      title: '',
    },
    onToggle: id => {
      this.toggledState = getItem('toggledDocument', this.toggledState)
      
      if (this.toggledState.includes(Number(id))) {
        this.toggledState.splice(this.toggledState.indexOf(Number(id)), 1);
      } else {
        this.toggledState.push(Number(id));
      }
      
      setItem('toggledDocument', this.toggledState)
      this.setState();
    },
    onSelect: id => {
      const prevSelectedId = getItem('selectedDocument', [])[0];
      console.log(prevSelectedId)
      if(prevSelectedId !== Number(id)) {
        setItem('selectedDocument', [Number(id)])
      }

      pushRoute(`/documents/${id}`)
    },
    onCreateChild: id => {
      if (!this.toggledState.includes(Number(id))) {
        this.toggledState.push(Number(id));
        setItem('toggledDocument', this.toggledState);
      }

      pushRoute(`/documents/new/${id}`);
    }
  })


  this.setState = async () => {
    const nextState = await request('/documents');
    const selectedState = getItem('selectedDocument', []);
    this.state = nextState;    

    documentList.setState(this.state, this.toggledState, selectedState);
  }
}