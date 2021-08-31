export default function SidebarHeader({ $target }) {
	const $headerTitlte = $createElement('div', '.header-title');
	$headerTitlte.textContent = '손수림의 notion';
	$target.appendChild($headerTitlte);

	const $headerToggleBtn = $createElement('button', '.header-toggle-btn');
	$headerToggleBtn.textContent = '🍔';
	$target.appendChild($headerToggleBtn);
}
