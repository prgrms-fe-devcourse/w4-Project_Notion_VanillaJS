import SidebarHeader from './SidebarHeader.js';
import SidebarBody from './SidebarBody.js';
import SidebarFooter from './SidebarFooter.js';

export default function Sidebar({ $target, initialState }) {
	const $sidebar = $createElement('div', '.col');
	$target.appendChild($sidebar);

	new SidebarHeader({ $target: $sidebar, initialState });
	new SidebarBody({ $target: $sidebar, initialState });
	new SidebarFooter({ $target: $sidebar, initialState });
}
