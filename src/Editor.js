// export default function Editor({
//                                  $target,
//                                  initialState = {
//                                    documentTitle: '',
//                                    documentContent: ''
//                                  },
//                                  onEditing
//                                }) {
//
//   /*
// * $target:$editPage,
// 		initialState:{
// 			documentTitle,
// 			documentContent
// 		}
// 		onEditing:()=>{}
// * */
//
//   const $editor = document.createElement('div')
//   $editor.setAttribute('id', 'editor')
//   $editor.style.height = '600px'
//   $editor.style.width = 'auto'
//
//   this.state = initialState
//   const {documentTitle, documentContent} = this.state
//   $editor.innerHTML = `
//       <div contenteditable="true" name="title" class="editor-title">${documentTitle === undefined ? '' : documentTitle}</div>
//       <button id="btn-raw" style="background-color: rgb(212,212,212);">raw</button>
//       <button id="btn-preview" >preview</button>
//       <textarea name="content" class="editor-content">${documentContent === null ? '' : documentContent}</textarea>
//       <div id="preview-content" style="display: none"></div>
//     `
//   $target.appendChild($editor)
//
//   this.setState = nextState => {
//     this.state = nextState
//     this.render()
//   }
//
//   //TODO: 이거 잘되면 render()를 이거로 교체할것!
//   const $previewContent=document.querySelector('#preview-content')
//   const $btnRaw=document.querySelector('#btn-raw')
//   const $editorContent=document.querySelector('.editor-content')
//   const $btnPreview=document.querySelector('#btn-preview')
//
//   $btnRaw.addEventListener('click',()=>{
//     $previewContent.style.display='none'
//     $editorContent.style.display='block'
//     $btnPreview.style.backgroundColor='white'
//     $btnRaw.style.backgroundColor='rgb(212,212,212)'
//     // $btnRaw.setAttribute('disabled','disabled')
//     // $btnPreview.removeAttribute('disabled')
//   })
//   $btnPreview.addEventListener('click',()=>{
//     $previewContent.style.display='block'
//     $editorContent.style.display='none'
//     $btnPreview.style.backgroundColor='rgb(212,212,212)'
//     $btnRaw.style.backgroundColor='white'
//     // $btnPreview.setAttribute('disabled','disabled')
//     // $btnRaw.removeAttribute('disabled')
//   })
//   const renderContent=()=>{
//     // console.log(lines)
//     let res
//     const lines=$editorContent.value.split('\n').map(line=>{
//       //TODO: 각종 마크다운 추가하기
//       if(line.indexOf('# ')===0){
//         res= `<h1>${line.substr(2)}</h1>`
//       }else if(line.indexOf('## ')===0){
//         res= `<h2>${line.substr(3)}</h2>`
//       }else if(line.indexOf('### ')===0){
//         res= `<h3>${line.substr(4)}</h3>`
//       }else if(line.indexOf('#### ')===0){
//         res= `<h4>${line.substr(5)}</h4>`
//       }else if(line.indexOf('##### ')===0){
//         res= `<h5>${line.substr(6)}</h5>`
//       }else if(line.indexOf('* ')===0) {
//         res=`<li>${line.substr(2)}</li>`
//       }else{
//         res=line
//       }
//       return res
//     }).join('')
//     $previewContent.innerHTML=lines
//
//   }
//
//   this.render = () => {
//
//     // const richTitle=this.state.documentTitle=`<h1>${this.state.documentTitle}</h1>`
//
//     $editor.querySelector('[name=title]').innerHTML = this.state.documentTitle
//     $editor.querySelector('[name=content]').value = this.state.documentContent
//
//     renderContent()
//   }
//   this.render()
//
//
//   $editor.querySelector('[name=title]').addEventListener('input', e => {
//
//     const nextState = {
//       ...this.state,
//       documentTitle: e.target.innerText
//     }
//     this.setState(nextState)
//     console.log(e.target.innerText)
//     let offset = e.target.innerText.length
//     let range = document.createRange()
//     let sel = window.getSelection()
//     range.setStart(e.target.childNodes[0], offset)
//     sel.removeAllRanges()
//     sel.addRange(range)
//     onEditing(this.state)
//   })
//   $editor.querySelector('[name=content]').addEventListener('input', e => {
//     const nextState = {
//       ...this.state,
//       documentContent: e.target.value
//     }
//     this.setState(nextState)
//
//     // const $editorContent=document.querySelector('.editor-content')
//     // let i=0;
//     // let offset=$editorContent.innerText.length
//     // console.log(offset)
//     // let range=document.createRange()
//     // let sel=window.getSelection()
//     // console.log($editorContent.childNodes[0])
//     // range.setStart($editorContent.childNodes[0],offset)
//     // sel.removeAllRanges()
//     // sel.addRange(range)
//
//     onEditing(this.state)
//     // renderContent()
//     // const lines=$editorContent.value
//     // console.log(lines)
//     // lines.split('\n').map(line=>{
//     //   if(line.indexOf('# ')===0){
//     //     return `<h1>${line}</h1>`
//     //   }
//     // }).join('')
//     // $previewContent.innerHTML=lines
//   })
//
// }