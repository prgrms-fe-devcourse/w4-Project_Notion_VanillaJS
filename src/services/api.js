import Toast, { TOAST_FAIL_TYPE } from '../components/Toast.js';

const API_END_POINT = 'https://kdt.roto.codes';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'datalater',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    new Toast({
      type: TOAST_FAIL_TYPE,
      message: 'API 호출 오류',
    });

    throw new Error('API 호출 오류');
  } catch (e) {
    throw new Error(e.message);
  }
};
