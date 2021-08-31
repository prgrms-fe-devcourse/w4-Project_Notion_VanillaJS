export const API_END_POINT = 'https://kdt.roto.codes'

export const request = async (url, username, option = {}, ) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: {
        'x-username': username,
        'content-Type' : 'application/json'
      }
    })

    if (response.ok) {
      return await response.json()
    }

    throw new Error('API Error')
  } catch (error) {
    throw new Error(error.message)
  }
}