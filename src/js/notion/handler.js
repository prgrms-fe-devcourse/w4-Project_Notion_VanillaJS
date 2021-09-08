import {CURRENT_EDIT_DOCUMENT_ID} from '../constants/storage.js';
import {$} from '../utils/DOM.js';
import {push} from '../utils/router.js';
import {setItem} from '../utils/storage.js';
import {toggleOff, toggleOn} from './document/ToggleControl.js';

export const onToggle = (id) => {
    const $target = $(`[data-id='${id}']`);
    $target.className.includes('toggled') ? toggleOff(id) : toggleOn(id);
};

export const onSelect = (id) => {
    push(`/documents/${id}`);
    setItem(CURRENT_EDIT_DOCUMENT_ID, id);
};
