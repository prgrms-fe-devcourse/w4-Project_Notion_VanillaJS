export default function ModalBody({ $target, initialState, onCreate, onEdit }) {
	const $modalTitle = $createElement('p', 'modal-title');
	const $modalContent = $createElement('p', 'modal-content');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$modalTitle.innerHTML = `
      <input type="text" placeholder="제목 없음">
    `;

		$modalContent.innerHTML = `
      <textarea placeholder="페이지의 내용을 입력해보세요!"></textarea>
    `;
	};

	this.render();

	$modalTitle.querySelector('input').addEventListener('keyup', e => {
		const content = $modalContent.querySelector('textarea').value;
		const documnet = {
			title: e.target.value,
			content,
		};
		const { pathname } = window.location;
		if (pathname.includes('new')) {
			onCreate.createDocument(documnet);
		} else {
			onEdit.editTitlte(e.target.value);
		}
	});

	$modalContent.querySelector('textarea').addEventListener('keyup', e => {
		// const title = $modalTitle.querySelector('input').value;
		// const document = {
		// 	title,
		// 	content: e.target.value,
		// };
		// const { pathname } = window.location;
		// if (pathname.includes('new')) {
		// 	onCreate.createDocument(document);
		// } else {
		// 	onEdit.editContent(e.target.value);
		// }
	});
	$target.appendChild($modalTitle);
	$target.appendChild($modalContent);
}
