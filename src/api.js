const API_END_POINT = 'https://kdt.roto.codes/documents';

export const request = async (url, options = {}) => {
  try {
    const res = fetch(`${API_END_POINT}${url}`, {
      ...options,
      'Content-Type': 'application/json',
      'x-username': 'progwon'
    });

    if (res.ok) {
      const json = await res.json();
      return json;
    }

    throw new Error('API 호출 오류');
  } catch (e) {
    alert(e.message);
  }
};
