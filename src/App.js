import Sidebar from './components/sidebar/Sidebar.js';

export default function App({ $target, initialState }) {
	const $row = $createElement('div', '.row');
	$target.appendChild($row);

	this.state = initialState;

	new Sidebar({ $target: $row, initialState });
}
