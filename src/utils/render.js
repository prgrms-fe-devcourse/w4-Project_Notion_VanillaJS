import {
	$createElement,
	$listItem,
	$treeItem,
	$blankItem,
	$newPostListItem,
} from './templates.js';

const drawNavList = (target, childDocuments, openedLi) => {
	childDocuments.forEach(({ id, title, documents }) => {
		const $li = $listItem();
		const haveChild = documents.length > 0;

		if (haveChild) {
			const $tree = $treeItem();

			drawNavList($tree, documents, openedLi);
			addClass($li, 'nav-header', 'tree-toggler');

			$li.appendChild($tree);
		} else {
			const $blank = $blankItem();
			$li.appendChild($blank);
		}
		const $filledListItem = fillListItem($li, { id, title, openedLi });
		target.appendChild($filledListItem);
	});
};

const fillListItem = ($li, { id, title, openedLi }) => {
	const matchTypedId = `${id}`;
	const isOpenedLi = openedLi?.includes(matchTypedId);

	if (isOpenedLi) {
		$li.querySelector('.hide').classList.remove('hide');
		$li
			.querySelector('.nav-toggler-btn')
			.classList.replace('icon-play', 'icon-down-dir');
	}

	$li.setAttribute('data-id', id);
	$li.querySelector('.nav-page-title').textContent = title;

	return $li;
};

const markListItemOfId = id => {
	$('.nav-item.selected')?.classList.remove('selected');
	$(`li[data-id="${id}"] p`).classList.add('selected');
};

const markListItemofLi = $li => {
	$('.nav-item.selected')?.classList.remove('selected');
	$li.querySelector('.nav-item').classList.add('selected');
};

const makeNewPostLiOnRoot = ({ needMark }) => {
	const $newPostLi = $newPostListItem();

	if (needMark) {
		markListItemofLi($newPostLi);
	}

	$('.root').appendChild($newPostLi);
};

const makeNewPostLiOnTree = ({ $target, needMark }) => {
	const $blank = $target.querySelector('.blank');
	const $toggleBtn = $target.querySelector('.nav-toggler-btn');

	const $ul = $createElement('ul', '.tree');
	const $newPostLi = $newPostListItem();
	addClass($target, 'nav-header', 'tree-toggler');

	if (needMark) {
		markListItemofLi($newPostLi);
	}

	if ($blank) {
		$blank.remove();
	}

	$toggleBtn.classList.replace('icon-play', 'icon-down-dir');
	$ul.appendChild($newPostLi);
	$target.appendChild($ul);
};

export {
	drawNavList,
	fillListItem,
	markListItemOfId,
	markListItemofLi,
	makeNewPostLiOnRoot,
	makeNewPostLiOnTree,
};
