import AddDocButton from './AddDocButton.js';
import UserName from './Username.js';
import { createElement } from '../utils/DOM.js'

export default function SidebarHeader({$target, makeRootDoc}) {
  const $sidebarHeader= createElement('div');
  $sidebarHeader.setAttribute('class','sidebar-header');

  $target.appendChild($sidebarHeader);
  
  new UserName({
    $target : $sidebarHeader,
    initialState : '김영후'
  })

  new AddDocButton({
    $target : $sidebarHeader,
    initialState : 'NEW DOC',
    makeRootDoc,
  })
}