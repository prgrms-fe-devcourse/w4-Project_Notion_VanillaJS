export const API_END_POINT = "https://kdt.roto.codes"
export const request = async (url, options = {}) => {
  try {
    const result = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "palsa131",
        "Content-Type": "application/json",
      },
    })
    if (result.ok) {
      return await result.json()
    }
    throw new Error("API 처리중 오류")
  } catch (e) {
    alert(e.message)
  }
}
