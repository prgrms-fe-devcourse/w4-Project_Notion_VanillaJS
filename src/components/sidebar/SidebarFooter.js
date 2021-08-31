export default function SidebarFooter({ $target, initialState }) {
	const $sidebarFooter = $createElement('div', '.sidebar-footer');
	$sidebarFooter.textContent = 'sidebarFooter';

	$target.appendChild($sidebarFooter);
}
