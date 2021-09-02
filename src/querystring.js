export const parse = (querystring) => {
  // '?name=roto&job=bassist'
  // &로 쪼갠다
  // key=value의 조합을 object로 만든다
  // 만들어진거 리턴한다

  // const querystrings = {}

  //루프 돌면서 querystring에 키와 값 추가

  return querystring.split('&').reduce((acc, keyAndValue) => {
    const [key, value] = keyAndValue.split('=')
    if (key && value) {
      acc[key] = value
    }
    return acc
  }, {})
};
