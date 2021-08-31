export default function PageHeader({ $target, initialState }) {
	const $breadCrumb = $createElement('div', '.header-breadcrumb');
	const $external = $createElement('div', '.header-external');
	$target.appendChild($breadCrumb);
	$target.appendChild($external);

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$breadCrumb.textContent = '손수림의 notion/ 첫번째 문서';
		$external.textContent = '...';
	};

	this.render();
}
