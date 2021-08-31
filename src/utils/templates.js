const $listItem = (id = 'new', title = '제목없음', currentState) => {
	const select = currentState.id === id ? 'selected' : '';

	const $li = $createElement('li');

	$li.setAttribute('data-id', id);
	$li.innerHTML = `
      <button class="nav-toggler-btn">🔻</button>
      <span class="nav-page-title ${select}">${title}</span>
      <button class="nav-external-btn">...</button>
      <button class="nav-crate-btn" data-target="modal">+</button>
    `;
	return $li;
};

export { $listItem };
