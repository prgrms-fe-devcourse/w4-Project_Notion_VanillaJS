import { $createElement } from '../../utils/templates.js';

export default function PageNoData({ $target }) {
	const $noData = $createElement('div', '.nodata-page');

	this.render = () => {
		$target.innerHTML = '';
		$noData.textContent = '페이지를 선택해보세요! 😎';

		$target.appendChild($noData);
	};
}
