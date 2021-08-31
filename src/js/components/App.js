import Component from '../core/Component.js'

const App = class extends Component{
  template() {
    return `
      <div id="doc-list"></div>
      <div id="doc-edit"></div>
    `     
  }

  mount() {
    const $docList = $target.querySelector('#doc-list');

    // new DocListContainer($docList)
  }
}

export default App
