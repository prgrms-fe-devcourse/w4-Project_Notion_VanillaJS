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
  $editor.style.width = '600px'
  this.state = initialState
  const {documentTitle, documentContent} = this.state
  $editor.innerHTML = `
      <textarea name="title">${documentTitle === undefined ? '' : documentTitle}</textarea>
      <textarea cols="100" rows="100" name="content">${documentContent === null ? '' : documentContent}</textarea>
    `
  $target.appendChild($editor)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  this.render = () => {
    const richContent=this.state.documentContent.split('\n').map(line=>{

    })
    $editor.querySelector('[name=title]').value=this.state.documentTitle
    $editor.querySelector('[name=content]').value=this.state.documentContent
  }
  this.render()
  $editor.querySelector('[name=title]').addEventListener('input',e=>{
    const nextState={
      ...this.state,
      documentTitle:e.target.value
    }
    this.setState(nextState)
    console.log(e.target.innerHTML)
    onEditing(this.state)
  })
  $editor.querySelector('[name=content]').addEventListener('input',e=>{
    const nextState={
      ...this.state,
      documentContent:e.target.value
    }
    this.setState(nextState)
    // console.log(e.target.innerHTML)
    onEditing(this.state)
  })
}