export default function SidebarFooter({ $target }) {
	const $divider = $createElement('hr', '.footer-divider');
	const $createBtn = $createElement('span', '.create-btn');
	$createBtn.setAttribute('data-target', 'page');
	$createBtn.textContent = '+ 새 페이지';

	$target.appendChild($divider);
	$target.appendChild($createBtn);
}
