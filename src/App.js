import { on } from './utils/emitter.js';
import { getStateAfter } from './store/gettersState.js';

import Store from './store/index.js';
import MainPage from './pages/MainPage.js';

export default function App({ $target }) {
	this.init = async () => {
		const initialState = await getStateAfter('init');

		if ($('.not-found')) {
			history.replaceState(null, null, `/404`);
			return;
		}

		this.state = initialState;
		this.setState = (nextState, needRender) => {
			mainpage.setState(nextState, needRender);
		};

		const mainpage = new MainPage({ $target, initialState });

		new Store();
		on.updateState((nextState, needRender) =>
			this.setState(nextState, needRender),
		);
	};

	this.init();
}
