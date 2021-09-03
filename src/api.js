export const API_END_POINT = 'https://kdt.roto.codes';

export const request = async (userName, url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}/${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': userName
      }
    });

    if (res.ok) {
      const resjson = await res.json();
      console.log(`res.json:`, resjson);
      return resjson;
    }
    throw new Error('API 호출 오류');
  } catch (e) {
    console.log(e.message);
  }
}