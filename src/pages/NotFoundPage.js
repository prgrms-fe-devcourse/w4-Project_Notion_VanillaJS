import { $createElement } from '../utils/templates.js';

export default function NotFoundPage({ $target }) {
	const $page = $createElement('div', '.not-found');

	const $title = $createElement('h1', '.not-fount-title');
	$title.textContent = 'Oops.. 404 Error!';

	const $home = $createElement('a', '.home');
	$home.textContent = '메인으로 가기';
	$home.setAttribute('href', `${window.location.origin}`);

	$page.appendChild($title);
	$page.appendChild($home);
	$target.appendChild($page);
}
