import Component from '../core/Component.js';

const Header = class extends Component{
  template() {
    return `
        <i class='bx bxs-package'></i>
        <h1 class="notion-title">Dorr의  Notion</h1> 
    `
  }
}

export default Header
