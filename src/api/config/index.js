import NotFoundPage from '../../pages/NotFoundPage.js';

const BASE_URL = 'https://kdt.roto.codes/documents';

const request = async (url, options = {}) => {
	try {
		const res = await fetch(`${BASE_URL}${url}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				'x-username': 'sonsurim',
			},
		});

		if (res.ok) {
			return await res.json();
		}

		throw new Error('API 처리 중 오류가 발생하였습니다!');
	} catch (e) {
		console.log(e.message);

		const $target = $('#app');
		return new NotFoundPage({ $target });
	}
};

export { request };
