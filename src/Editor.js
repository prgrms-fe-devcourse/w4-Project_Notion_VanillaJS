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
      <textarea name="content" class="editor-content">${documentContent === null ? '' : documentContent}</textarea>
    `
  $target.appendChild($editor)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  this.render = () => {

    // const richTitle=this.state.documentTitle=`<h1>${this.state.documentTitle}</h1>`
    $editor.querySelector('[name=title]').innerHTML=this.state.documentTitle
    $editor.querySelector('[name=content]').value=this.state.documentContent
  }
  this.render()



  $editor.querySelector('[name=title]').addEventListener('input',e=>{

    const nextState={
      ...this.state,
      documentTitle:e.target.innerText
    }
    this.setState(nextState)
    console.log(e.target.innerText)
    let offset=e.target.innerText.length
    let range=document.createRange()
    let sel=window.getSelection()
    range.setStart(e.target.childNodes[0],offset)
    sel.removeAllRanges()
    sel.addRange(range)
    onEditing(this.state)
  })
  $editor.querySelector('[name=content]').addEventListener('input',e=>{
    const nextState={
      ...this.state,
      documentContent:e.target.value
    }
    this.setState(nextState)
    //
    // let offset=e.target.innerText.length
    // let range=document.createRange()
    // let sel=window.getSelection()
    // range.setStart(e.target.childNodes[0],offset)
    // sel.removeAllRanges()
    // sel.addRange(range)

    onEditing(this.state)
  })
}