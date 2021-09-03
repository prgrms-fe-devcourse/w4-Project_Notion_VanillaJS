//id가 selectedId인 obj에 selected :true 나머지 false
export function changeSelectedList(obj, selectedId) {
  if (!selectedId) {
    throw new Error("선택된 id값이 없습니다.")
  }
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === "object") {
      obj[key].id === parseInt(selectedId)
        ? (obj[key].selected = true)
        : (obj[key].selected = false)
      changeSelectedList(obj[key], selectedId)
    }
  }
  return obj
}
/* 하위 문서 검색
export function makeSubDocList(
  obj,
  selectedId,
  subList = [],
  isSubDoc = false
) {
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === "object") {
      if (obj[key].id === parseInt(selectedId)) {
        makeSubDocList(obj[key], selectedId, subList, !isSubDoc)
      } else {
        if (isSubDoc && obj[key].title) {
          subList.push(obj[key])
        }
        makeSubDocList(obj[key], selectedId, subList, isSubDoc)
      }
    }
  }
  return subList
}
*/
