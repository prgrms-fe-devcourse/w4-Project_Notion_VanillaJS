import { on } from './utils/emitter.js';
import { getStateAfter } from './store/gettersState.js';

import Store from './store/index.js';
import NotFoundPage from './pages/NotFoundPage.js';
import MainPage from './pages/MainPage.js';

export default function App({ $target }) {
	this.init = async () => {
		this.setState = ({ nextState, needRender }) => {
			this.state = nextState;
			mainpage.setState({ nextState, needRender });
		};

		const notFoundPage = new NotFoundPage({ $target });
		const mainpage = new MainPage({ $target, initialState: this.state });

		this.route = async () => {
			const { pathname } = window.location;

			if (pathname === '/404') {
				notFoundPage.render();
				return;
			}

			const nextState = await getStateAfter('fetch');
			this.setState({ nextState, needRender: 'all' });
		};

		this.route();

		new Store();
		on.updateState((nextState, needRender) =>
			this.setState({ nextState, needRender }),
		);

		window.addEventListener('popstate', e => {
			this.route();
		});
	};

	this.init();
}
