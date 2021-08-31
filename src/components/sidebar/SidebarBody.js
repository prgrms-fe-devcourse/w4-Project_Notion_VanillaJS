import SidebarBodyNavList from './SidebarBodyNavList.js';

export default function SidebarBody({ $target, initialState }) {
	const $sidebarBody = $createElement('div', '.sidebar-body');
	$target.appendChild($sidebarBody);

	new SidebarBodyNavList({ $target: $sidebarBody, initialState });
}
