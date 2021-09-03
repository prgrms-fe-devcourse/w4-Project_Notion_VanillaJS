function $(element) {
	return document.querySelector(element);
}

function addClass($element, ...classNames) {
	classNames.forEach(className => $element.classList.add(className));
}
