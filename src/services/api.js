const API_END_POINT = 'https://kdt.roto.codes';

export const request = async (url, options = {}) => {
  const res = await fetch(`${API_END_POINT}${url}`, {
    ...options,
    headers: {
      'x-username': 'roto',
      'Content-Type': 'application/json',
    },
  });

  try {
    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 호출 오류');
  } catch (e) {
    alert(e.message);
  }
};
