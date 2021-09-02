const $listItem = (id = 'new', title = '제목없음') => {
	const $li = $createElement('li');

	$li.setAttribute('data-id', id);
	$li.innerHTML = `
      <button class="nav-toggler-btn">▼</button>
      <span class="nav-page-title">${title}</span>
      <button class="nav-delete-btn">🗑</button>
      <button class="nav-crate-btn" data-target="modal">+</button>
    `;
	return $li;
};

const $drawNewLi = ($li, needMark) => {
	const $newLi = $listItem('new', '제목없음');

	if (needMark) {
		$('span.selected')?.classList.remove('selected');
		$newLi.querySelector('.nav-page-title').classList.add('selected');
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

export { $listItem, $drawNewLi };
