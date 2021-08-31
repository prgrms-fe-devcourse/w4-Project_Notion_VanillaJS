export default function ModalHeader({ $target, onClick }) {
	const $openPagebtn = $createElement('button', 'openpage-btn');
	$openPagebtn.textContent = '페이지로 열기';

	const $closeModalBtn = $createElement('button', 'close-modal-btn');
	$closeModalBtn.textContent = 'X';

	$openPagebtn.addEventListener('click', e => {
		onClick.openPage();
	});

	$closeModalBtn.addEventListener('click', e => {
		onClick.closeModal();
	});

	$target.appendChild($openPagebtn);
	$target.appendChild($closeModalBtn);
}
