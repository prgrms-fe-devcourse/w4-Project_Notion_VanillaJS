export const API_END_POINT = 'https://kdt.roto.codes'
const USER_NAME = 'testm'

export const request = async (url, option = {}, ) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers: {
        'x-username': USER_NAME,
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