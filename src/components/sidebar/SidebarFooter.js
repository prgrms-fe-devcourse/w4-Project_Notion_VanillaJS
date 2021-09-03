export default function SidebarFooter({ $target, onClick }) {
	const $createBtn = $createElement('span', '.create-btn');
	$createBtn.setAttribute('data-target', 'modal');
	$createBtn.textContent = '+ 새 페이지';

	$createBtn.addEventListener('click', e => {
		onClick.createDocument();
	});

	$target.appendChild($createBtn);
}
