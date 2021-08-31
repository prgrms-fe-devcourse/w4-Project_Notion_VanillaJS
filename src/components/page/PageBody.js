export default function PageBody({ $target, initialState }) {
	const $pageTitle = $createElement('div', 'page-title');
	const $pageContent = $createElement('div', 'page-content');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$pageTitle.textContent = '첫번째 문서';
		$pageContent.textContent = '첫번째 문서 내용입니다.';
	};

	this.render();
	$target.appendChild($pageTitle);
	$target.appendChild($pageContent);
}
