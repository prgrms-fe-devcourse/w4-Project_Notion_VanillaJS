export default function EditorModal({ $target, initialState }) {
	const $editorModal = document.createElement('div');
	$editorModal.classList.add('editor-modal');
	$editorModal.classList.add('hide');
	$target.appendChild($editorModal);

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	$editorModal.innerHTML = `
    <div>
      <p>
        <input type="text" class="modal-title" placeholder="제목없음" />
        <span class="modal-close">x</span>
      </p>
      <p>
        <textarea class="modal-content"></textarea>
      </p>
    </div>
  `;

	$editorModal.addEventListener('click', e => {
		if (e.target.className.includes('modal-close')) {
			$('.editor-modal').classList.add('hide');
		}
	});

	$('.modal-title').addEventListener('keyup', e => {
		$('.temp-document').textContent = e.target.value.trim();
	});

	$('.modal-content').addEventListener('keyup', e => {
		console.log(e.target.value);
	});

	this.render = () => {
		console.log(initialState);
	};

	this.render();
}
