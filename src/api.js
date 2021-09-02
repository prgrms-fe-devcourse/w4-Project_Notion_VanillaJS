export const API_END_POINT = 'https://kdt.roto.codes'


//options가 없는 경우 기본값 정의
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': '2sjeong918'
      }
    })
    // fetch 사용시 ok 체크 필수!
    if(res.ok) {
      const json = await res.json()
      return json
    }
    throw new Error('API 호출 오류')
  } catch (e) {
    // 지금은 에러메세지만 띄우지만, UI화면까지 처리하는게 베스트!
    alert(e.message)
  }
}