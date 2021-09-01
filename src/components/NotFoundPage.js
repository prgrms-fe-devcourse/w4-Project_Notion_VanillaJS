export default function NotFoundPage({ $target }) {
	const $page = $createElement('div', '.not-found');
	const $home = $createElement('a', '.home');

	this.render = () => {
		$page.textContent = '404 Error!';
		$home.textContent = '메인으로 가기';
		$home.setAttribute('href', `${window.location.origin}`);
	};

	this.render();

	$page.appendChild($home);
	$target.appendChild($page);
}
