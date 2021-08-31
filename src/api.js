export const API_END_POINT = 'https://kdt.roto.codes'

export const request = async (url, options = {} ) => {
  try {
    const res = await fetch (`${API_END_POINT}/documents${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'jinhwansuh'
      }
    })
    if (res.ok) {
      return await res.json()
    }
    throw new Error('어디선가 에러가 발생했어요.')
  } catch(e) {
    alert(e.message)
  }
}
