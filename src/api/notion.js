import { request } from './config/index.js';

const notionAPI = {
	getDocuments: async id => {
		const url = id ? `/${id}` : '';
		const res = await request(url, { method: 'GET' });
		return res;
	},
	createDocument: async document => {
		return await request('', {
			method: 'POST',
			body: JSON.stringify(document),
		});
	},
	updateDocument: async (id, document) => {
		return await request(`/${id}`, {
			method: 'PUT',
			body: JSON.stringify(document),
		});
	},
	deleteDocument: async id => {
		return await request(`/${id}`, {
			method: 'DELETE',
		});
	},
};

export default notionAPI;
