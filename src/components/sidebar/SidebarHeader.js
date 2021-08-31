export default function SidebarHeader({ $target, initialState }) {
	const $sidebarHeader = $createElement('div', '.sidebar-header');

	const $headerTitlte = $createElement('div', '.header-title');
	$headerTitlte.textContent = '손수림의 notion';

	const $headerToggleBtn = $createElement('button', '.header-toggle-btn');
	$headerToggleBtn.textContent = '🍔';

	$target.appendChild($sidebarHeader);
	$sidebarHeader.appendChild($headerTitlte);
	$sidebarHeader.appendChild($headerToggleBtn);
}
