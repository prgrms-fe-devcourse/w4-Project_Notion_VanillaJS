export default function ModalHeader({ $target, onClick }) {
	const $openPagebtn = $createElement('button', 'openpage-btn');
	$openPagebtn.textContent = '페이지로 열기';
	$target.appendChild($openPagebtn);

	const $closeModalBtn = $createElement('button', 'close-modal-btn');
	$closeModalBtn.textContent = 'X';
	$target.appendChild($closeModalBtn);

	$openPagebtn.addEventListener('click', e => {
		onClick.openPage();
	});

	$closeModalBtn.addEventListener('click', e => {
		onClick.closeModal();
	});
}
