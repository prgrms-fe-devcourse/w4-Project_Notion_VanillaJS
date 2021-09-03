const sidebarClassNames = {
  DOCUMENT: 'Sidebar__Document',
  DOCUMENT_REMOVE_BUTTON: 'Sidebar__RemoveButton',
  DOCUMENT_ADD_BUTTON: 'Sidebar__AddButton',
  DOCUMENT_COLLAPSE_BUTTON: 'Sidebar__CollapseButton',
}

export default function Sidebar({
  $target,
  initialState,
  onDocumentClick,
  onAddDocument,
  onDeleteDocument,
  onCollapseDocument,
}) {
  // TODO: initialState Type cecheking, call without new Operator validator
  const $sidebar = document.createElement('div')

  $target.appendChild($sidebar)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  // TODO : while문으로 바꿔주기
  // TODO: template으로 빼주기
  const renderDocuments = (
    documents,
    selectedDocumentId = this.state.selectedDocumentId,
  ) => {
    let result = '<ul class="PageBlock">'
    const children = documents
      .map(({ id, title, documents, isOpen, depth }) => {
        let item = `
          <li class="${sidebarClassNames.DOCUMENT}${
          id === selectedDocumentId
            ? ` ${sidebarClassNames.DOCUMENT}--selected`
            : ''
        }" data-id="${id}" style="padding-left: ${(depth + 1) * 14}px;"}>
            <div class="PageBlock__column" style="pointer-events: none;">
              <button type="button" style="pointer-events: all;" class="${
                sidebarClassNames.DOCUMENT_COLLAPSE_BUTTON
              }">
                ${
                  isOpen === undefined || isOpen
                    ? `<i class="fas fa-caret-down"></i>`
                    : `<i class="fas fa-caret-right"></i>`
                }
              </button>
              <span>
                ${
                  title.length > 21 - depth
                    ? `${title.substr(0, 21 - depth)}...`
                    : title
                }
              </span>
            </div>
            <div class="PageBlock__buttons">
              <button type="button" class="${
                sidebarClassNames.DOCUMENT_REMOVE_BUTTON
              }">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button type="button" class="${
                sidebarClassNames.DOCUMENT_ADD_BUTTON
              }">
                <i class="fas fa-plus"></i> 
              </button>
            </div>
          </li>`

        if (isOpen || isOpen === undefined) {
          if (documents?.length === 0) {
            const child = `
              <li class="${
                sidebarClassNames.DOCUMENT
              }--disable" style="padding-left: ${
              (depth + 1) * 14
            }px;""> No pages inside </li>
            `
            item += child
          } else {
            const child = renderDocuments(documents, selectedDocumentId)
            item += child
          }
        }

        return item
      })
      .join('')
    result += children
    result += `</ul>`

    return result
  }

  this.render = () => {
    const { documents } = this.state
    $sidebar.innerHTML = `
    ${renderDocuments(documents)}
    <div class="Sidebar__DocumentAdd">
      <button class="${sidebarClassNames.DOCUMENT_ADD_BUTTON}" type="button">
        <i class="fas fa-plus"></i>
        <span> Add a Page </span>
      </button>
    </div>
    `
  }

  const init = async () => {
    let timer = null
    $sidebar.addEventListener('click', async (e) => {
      const { className } = e.target
      if (className) {
        switch (className) {
          case sidebarClassNames.DOCUMENT:
            const { id } = e.target.dataset
            // TODO: parseInt, Number 비교
            onDocumentClick(parseInt(id))
            break

          case sidebarClassNames.DOCUMENT_ADD_BUTTON:
            if (timer) {
              clearTimeout(timer)
            }
            timer = setTimeout(() => {
              const $li = e.target.closest(`.${sidebarClassNames.DOCUMENT}`)
              let parent = null

              if ($li) {
                const { id } = $li.dataset
                parent = id
              }

              const document = {
                title: 'Untitled',
                parent,
              }

              onAddDocument(document)
            }, 300)
            break

          case sidebarClassNames.DOCUMENT_REMOVE_BUTTON:
            const $li = e.target.closest(`.${sidebarClassNames.DOCUMENT}`)

            if ($li) {
              const { id } = $li.dataset

              onDeleteDocument(id)
            }
            break

          case sidebarClassNames.DOCUMENT_COLLAPSE_BUTTON:
            const $li2 = e.target
              .closest(`.${sidebarClassNames.DOCUMENT}`)
              .parentNode.querySelector('ul')
            console.log($li2)
        }
      }
    })
  }

  init()
}
