function $(element) {
	return document.querySelector(element);
}
function $createElement(element, option) {
	const $element = document.createElement(element);

	if (option) {
		const optionName = option.substring(1);

		switch (option[0]) {
			case '#':
				$element.setAttribute('id', optionName);
				break;
			default:
				$element.classList.add(optionName);
		}
	}
	return $element;
}

function addClassAll($element, ...classNames) {
	classNames.forEach(className => $element.classList.add(className));
}
