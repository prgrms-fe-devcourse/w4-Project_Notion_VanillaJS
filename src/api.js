const API_END_POINT = 'https://kdt.roto.codes/documents';

export const request = async (url = '', options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'progwon'
      }
    });

    if (res.ok) {
      return res.json();
    }

    throw new Error();
  } catch (e) {
    alert(e.message);
  }
};
