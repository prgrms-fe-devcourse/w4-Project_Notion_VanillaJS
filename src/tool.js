// 트리형태의 Root Document response를 array로 바꿔주는 함수
export function docsTreeToArray(res) { 
  const tree = [];
  for(let i=0; i<res.length; i++) 
  search(res[i])
  function search(docs){
    if(docs.documents.length){
      tree.push(docs);
      for(let i=0; i<docs.documents.length; i++){
        search(docs.documents[i])
      }
    }
    else{
      tree.push(docs)
      return
    }
  }
  return tree
}

export function ISOStringToDate(iso) { 
  const year = iso.slice(0,4);
  const month = iso.slice(5,7);
  const day = iso.slice(8,10);
  const hour = iso.slice(11,13);
  const minute = iso.slice(14,16);
  const dayString = `${year}-${month}-${day}`
  const minuteString = `${year}-${month}-${day} ${hour}:${minute}`
  return  dayString
}

// const today = new Date().toISOString()
// console.log(today);
// console.log(ISOStringToDate(today).minute);
