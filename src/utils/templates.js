const $blankItem = () => {
	const $blank = $createElement('p', '.blank');

	$blank.setAttribute('datat-id', 'blank');
	$blank.classList.add('hide');
	$blank.textContent = '하위 페이지가 없습니다.';

	return $blank;
};

const $listItem = (id = 'new', title = '제목없음') => {
	const $li = $createElement('li');

	$li.setAttribute('data-id', id);
	$li.innerHTML = `
			<p class="nav-item demo-icon">
				<button class="nav-toggler-btn icon-play"></button>
				<span class="nav-page-title">${title}</span>
				<button class="nav-delete-btn icon-trash-empty"> </button>
				<button class="nav-crate-btn icon-plus-squared-alt" data-target="modal"> </button>
			</p> `;

	return $li;
};

const $drawNewLi = ($li, needMark) => {
	const $newLi = $listItem('new', '제목없음');
	const $blank = $blankItem(false);
	$newLi.appendChild($blank);

	if (needMark) {
		$('p.selected')?.classList.remove('selected');
		$newLi.querySelector('p').classList.add('selected');
	}

	if (!$li) {
		$('.nav-list .tree').appendChild($newLi);
		return;
	}

	const $ul = $createElement('ul', '.tree');
	$ul.appendChild($newLi);
	$li.appendChild($ul);
	addClassAll($li, 'nav-header', 'tree-toggler');
};

export { $listItem, $blankItem, $drawNewLi };
