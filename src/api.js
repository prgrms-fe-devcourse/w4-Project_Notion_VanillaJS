export const API_END_POINT = 'https://kdt.roto.codes'

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'jeongs',
      },
    })

    if (res.ok) {
      return await res.json()
    }
    return new Error('API 호출 요류')
  } catch (e) {
    console.log(e.message)
  }
}
