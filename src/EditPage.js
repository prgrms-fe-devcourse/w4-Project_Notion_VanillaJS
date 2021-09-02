export default function EditPage({$target, initialState, onEditing}) {
  this.state = initialState;
  /**
   * initialState format
   * documentTitle:'',
   * documentContent:'',
   */
  const $editPage = document.createElement("div");
  $editPage.setAttribute("id", "edit-page");
  $target.appendChild($editPage);


  const {documentTitle, documentContent} = this.state
  $editPage.innerHTML = `
      <div contenteditable="true" name="title" class="editor-title">${documentTitle === undefined ? '' : documentTitle}</div>
      <button id="btn-raw" style="background-color: rgb(212,212,212);">raw</button>
      <button id="btn-preview" >preview</button>
      <textarea name="content" class="editor-content">${documentContent === null ? '' : documentContent}</textarea>
      <div class="preview-content" style="display: none"></div>

    `
  const $btnRaw = document.querySelector('#btn-raw')
  const $btnPreview = document.querySelector('#btn-preview')
  const $editorContent = document.querySelector('.editor-content') //markdown 작성 에디터
  const $previewContent = document.querySelector('.preview-content') // 작성한 에디터 html로 랜더링

  $btnRaw.addEventListener('click', () => {
    $previewContent.style.display = 'none'
    $editorContent.style.display = 'block'
    $btnPreview.style.backgroundColor = 'white'
    $btnRaw.style.backgroundColor = 'rgb(212,212,212)'

  })
  $btnPreview.addEventListener('click', () => {
    $previewContent.style.display = 'block'
    $editorContent.style.display = 'none'
    $btnPreview.style.backgroundColor = 'rgb(212,212,212)'
    $btnRaw.style.backgroundColor = 'white'

  })
  $editPage.querySelector('[name=title]').addEventListener('input', e => {

    const nextState = {
      ...this.state,
      documentTitle: e.target.innerText
    }
    this.setState(nextState)

    // 매 입력마다 커서가 맨 앞으로 이동 -> 현재 커서 위치 추적
    let offset = e.target.innerText.length
    let range = document.createRange()
    let sel = window.getSelection()
    range.setStart(e.target.childNodes[0], offset)
    sel.removeAllRanges()
    sel.addRange(range)
    onEditing(this.state)
  })
  $editPage.querySelector('[name=content]').addEventListener('input', e => {
    const nextState = {
      ...this.state,
      documentContent: e.target.value
    }
    this.setState(nextState)
    onEditing(this.state)
  })


  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  const renderContent = () => {
    let res
    $previewContent.innerHTML = $editorContent.value.split('\n').map(line => {
      // markdown -> html tag
      if (line.indexOf('# ') === 0) {
        res = `<h1>${line.substr(2)}</h1>`
      } else if (line.indexOf('## ') === 0) {
        res = `<h2>${line.substr(3)}</h2>`
      } else if (line.indexOf('### ') === 0) {
        res = `<h3>${line.substr(4)}</h3>`
      } else if (line.indexOf('#### ') === 0) {
        res = `<h4>${line.substr(5)}</h4>`
      } else if (line.indexOf('##### ') === 0) {
        res = `<h5>${line.substr(6)}</h5>`
      } else if (line.indexOf('* ') === 0) {
        res = `<li>${line.substr(2)}</li>`
      } else {
        res = line
      }
      /*
      * 강조체 처리
      * italic: *italic* || _italic_ -> <em>
      * bold: **bold** || __bold__ -> <strong>
      * del: ~~del~~ -> <del>
      * */
      if (res.includes('**')) {
        const count = countKeyword(res, '**')
        res = convertKeyword(res, parseInt(count / 2), '**', '<strong>', '</strong>')
      }
      if (res.includes('__')) {
        const count = countKeyword(res, '__')
        res = convertKeyword(res, parseInt(count / 2), '__', '<strong>', '</strong>')
      }
      if (res.includes('*')) {
        const count = countKeyword(res, '*')
        res = convertKeyword(res, parseInt(count / 2), '*', '<em>', '</em>')
      }
      if (res.includes('_')) {
        const count = countKeyword(res, '_')
        res = convertKeyword(res, parseInt(count / 2), '_', '<em>', '</em>')
      }
      if (res.includes('~~')) {
        const count = countKeyword(res, '~~')
        res = convertKeyword(res, parseInt(count / 2), '~~', '<del>', '</del>')
      }
      return res
    }).join('')

  }
  const convertKeyword = (str, count, keyword, frontTag, rearTag) => {
    let _str = str
    for (let i = 0; i < count; i++) {
      _str = _str.replace(keyword, frontTag)
      _str = _str.replace(keyword, rearTag)
    }
    return _str
  }
  const countKeyword = (str, keyword) => {
    let pos = str.indexOf(keyword)
    let count = 0
    while (pos !== -1) {
      count++
      pos = str.indexOf(keyword, pos + 1)
    }
    return count
  }

  this.render = () => {

    $editPage.querySelector('[name=title]').innerHTML = this.state.documentTitle
    $editPage.querySelector('[name=content]').value = this.state.documentContent
    renderContent()
  }
  this.render()
}
