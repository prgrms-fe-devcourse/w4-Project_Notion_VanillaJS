import Toast, { TOAST_FAIL_TYPE } from '../components/Toast.js';

const API_END_POINT = 'https://kdt.roto.codes';
const API_FAIL_MESSAGE = 'API 호출 오류';

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
      message: API_FAIL_MESSAGE,
    });

    throw new Error(API_FAIL_MESSAGE);
  } catch (e) {
    // eslint-disable-next-line no-restricted-globals
    console.log(API_FAIL_MESSAGE);
  }
};
