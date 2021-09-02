import { on } from '../utils/emitter.js';

import Sidebar from '../components/sidebar/Sidebar.js';
import PostsPage from '../components/posts/PostsPage.js';
import Modal from '../components/modal/Modal.js';

export default function MainPage({ $target, initialState }) {
	const $row = $createElement('div', '.row');

	this.state = initialState;
	this.setState = (nextState, needRender) => {
		this.state = nextState;
		this.render(needRender);
	};

	this.render = needRender => {
		switch (needRender) {
			case 'null':
				break;
			case 'sideBar':
				sideBar.setState(this.state);
				break;
			case 'postsPage':
				postsPage.setState(this.state);
				break;
			default:
				sideBar.setState(this.state);
				postsPage.setState(this.state);
		}
	};

	new Modal({ $target });

	const sideBar = new Sidebar({
		$target: $row,
		initialState: this.state,
	});
	const postsPage = new PostsPage({
		$target: $row,
		initialState: this.state,
	});

	$target.appendChild($row);

	this.render('all');
}
