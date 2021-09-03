import { pushUrl } from '../router.js'
import { removeItem, setItem, getItem } from '../storage.js'

export default function DocList({
  $target,
  initialState = [],
  addDoc,
  deleteDoc,
}) {
  const $docList = document.createElement('div')
  const paddingDepth = 20

  $target.appendChild($docList)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    console.log('render 실행')
    const recursiveDocuments = (documents, depth = 1) =>
      ($docList.innerHTML = `<ul class = 'doc-list'>
      ${documents
        .map(
          ({ id, title, documents }) =>
            `<li 
              data-id=${id}
					    class='doc-list-item ${
                Number(getItem('temp-doc', '').id) === id ? 'actived' : ''
              }'
            >
              <div class='doc-list-item-wrapper ${
                getItem(`toggle-doc-${id}`, false) ? 'toggled' : ''
              }'
              style='padding-left: ${depth * paddingDepth}px'
              >
                <i class ='drop-down-arrow'></i>
						    ${title}
                <div class='button-wrapper'>
						      <button type='button' class='delete-button' title='삭제하기'>-</button>
						      <button type='button' class='add-button' title='추가하기'>+</button>
                </div>
              </div>
						  ${
                !getItem(`toggle-doc-${id}`, false)
                  ? recursiveDocuments(documents, depth + 1)
                  : ''
              }
					</li>
          `
        )
        .join('')}
        </ul>
        `)
    recursiveDocuments(this.state)
  }

  $docList.addEventListener('click', (e) => {
    // list의 id 전달
    const { target } = e
    const $li = target.closest('li')
    if ($li) {
      const $liInner = $li.querySelector('.doc-list-item-wrapper')
      const { id } = $li.dataset
      let tempToggleSaveKey = `toggle-doc-${id}`
      let tempActiveSaveKey = `temp-doc`

      switch (target.className) {
        case 'add-button':
          addDoc(id)
          break
        case 'delete-button':
          deleteDoc(id)
          break
        case 'doc-list-item-wrapper ':
        case 'doc-list-item-wrapper toggled':
          pushUrl(`/documents/${id}`)
          if ($li.querySelector('ul > li')) {
            setItem(tempToggleSaveKey, true)
            $liInner.classList.add('toggled')
          } else {
            removeItem(tempToggleSaveKey)
            $liInner.classList.remove('toggled')
          }
          setItem(tempActiveSaveKey, {
            id,
          })
          this.render()
          break
        default:
          break
      }
    }
  })
}
