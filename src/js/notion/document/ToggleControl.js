import {$} from '../../utils/DOM.js'

export const toggleOff = (parentId) => {
    const $parent = $(`[data-id='${parentId}']`)

    $('.toggle', $parent).innerText = '▶'
    for (const $child of $parent.childNodes) {
        if ($child.className !== undefined && $child.className.includes('document-title')) {
            $child.style.display = 'none'
        }
        $parent.classList.remove('toggled')
    }
}

export const toggleOn = (parentId) => {
    const $parent = $(`[data-id='${parentId}']`)
    let subDocumentCount = 0

    for (const $child of $parent.childNodes) {
        if ($child.className !== undefined && $child.className.includes('document-title')) {
            subDocumentCount += 1
            $child.style.display = 'block'
        }
        $parent.classList.add('toggled')
    }

    if (subDocumentCount > 0) {
        $('.toggle', $parent).innerText = '▼'
    }
}
