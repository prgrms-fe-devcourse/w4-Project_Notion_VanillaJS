import { $createElement } from '../../utils/templates.js';

export default function ModalHeader({ $target, onClick }) {
	const $openPage = $createElement('span', '.modal-openpage-btn');
	$openPage.innerHTML = `
		<i class="demo-icon icon-resize-full"></i>
		페이지로 열기
	`;

	const $closeModalBtn = $createElement(
		'button',
		'.modal-close-btn',
		'.icon-cancel',
	);

	$target.appendChild($openPage);
	$target.appendChild($closeModalBtn);

	this.init = () => {
		$openPage.addEventListener('click', e => {
			onClick.openPage();
		});

		$closeModalBtn.addEventListener('click', e => {
			onClick.closeModal();
		});
	};

	this.init();
}
