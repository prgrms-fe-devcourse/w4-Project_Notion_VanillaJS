import { API_END_POINT, API_X_USERNAME, ERROR_MSG_API_ERROR } from './constants.js';

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': API_X_USERNAME,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error(ERROR_MSG_API_ERROR);
  } catch (error) {
    alert(error.message);
  }
};

export const fetchGetDocuments = () => {
  return request('/documents');
};

export const fetchGetDocument = id => {
  return request(`/documents/${id}`);
};

export const fetchAddDocuments = body => {
  return request('/documents', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const fetchPutDocument = (id, body) => {
  return request(`/documents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

export const fetchDeleteDocument = id => {
  return request(`/documents/${id}`, {
    method: 'DELETE',
  });
};
