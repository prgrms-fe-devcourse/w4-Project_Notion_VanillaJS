import AddDocButton from './AddDocButton.js';
import UserName from './Username.js';
import { createElement, setAttribute } from '../utils/DOM.js'

export default function SidebarHeader({$target, onClick}) {
  const $sidebarHeader= createElement('div');
  setAttribute([['class','sidebar-header']],$sidebarHeader);
  $target.appendChild($sidebarHeader);
  
  new UserName({
    $target : $sidebarHeader,
    initialState : '김영후'
  })

  new AddDocButton({
    $target : $sidebarHeader,
    initialState : 'New Doc',
    onClick,
  })
}