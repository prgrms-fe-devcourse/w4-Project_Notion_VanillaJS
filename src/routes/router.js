import { emit } from '../utils/emitter.js';

export default function Router() {
	const HOME = window.location.origin;

	this.route = () => {
		const { pathname } = window.location;
		const [, , id] = pathname.split('/');

		if (id) {
		} else {
			HOME;
		}
	};

	this.route();
}
