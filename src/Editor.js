export default function Editor({
                                 $target,
                                 initialState = {
                                   documentTitle: '',
                                   documentContent: ''
                                 },
                                 onEditing
                               }) {

  /*
* $target:$editPage,
		initialState:{
			documentTitle,
			documentContent
		}
		onEditing:()=>{}
* */

  const $editor = document.createElement('div')
  $editor.setAttribute('id', 'editor')
  $editor.style.height = '600px'
  $editor.style.width = 'auto'
  this.state = initialState
  const {documentTitle, documentContent} = this.state
  $editor.innerHTML = `
      <div contenteditable="true" name="title" class="editor-title">${documentTitle === undefined ? '' : documentTitle}</div>
      <div contenteditable="true" name="content" class="editor-content">${documentContent === null ? '' : documentContent}</div>
    `
  $target.appendChild($editor)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  this.render = () => {

    // const richTitle=this.state.documentTitle=`<h1>${this.state.documentTitle}</h1>`
    const richContent=this.state.documentContent.split('\n').map(line=>{
      if(line.indexOf('# ')===0){
        return `<h1>${line}</h1>`
      }else{
        return `${line}`
      }
    })
    $editor.querySelector('[name=title]').innerHTML = this.state.documentTitle
    $editor.querySelector('[name=content]').innerHTML = richContent
  }
  this.render()


  $editor.querySelector('[name=title]').addEventListener('input', e => {

    const nextState = {
      ...this.state,
      documentTitle: e.target.innerText
    }
    this.setState(nextState)
    console.log(e.target.innerText)
    let offset = e.target.innerText.length
    let range = document.createRange()
    let sel = window.getSelection()
    range.setStart(e.target.childNodes[0], offset)
    sel.removeAllRanges()
    sel.addRange(range)
    onEditing(this.state)
  })
  $editor.querySelector('[name=content]').addEventListener('input', e => {
    const nextState = {
      ...this.state,
      documentContent: e.target.innerText
    }
    this.setState(nextState)

    const $editorContent=document.querySelector('.editor-content')
    let i=0;
    let offset=$editorContent.innerText.length
    console.log(offset)
    let range=document.createRange()
    let sel=window.getSelection()
    // console.log($editorContent.childNodes[0])
    range.setStart($editorContent.childNodes[0],offset)
    sel.removeAllRanges()
    sel.addRange(range)

    onEditing(this.state)
  })
}