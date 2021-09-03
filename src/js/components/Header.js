import Component from '../core/Component.js';

const Header = class extends Component{
  template() {
    return `
      <div class="header-container">
        <div class="notion-icon">
          <i class="bx bx-notepad"></i>
        </div>
        <div class="notion-title">
          <h1>Dorr의  Notion</h1>
        </div>  
      <div>  
    `
  }
}

export default Header
