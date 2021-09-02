import { createElement } from '../utils/dom.js';
import { checkUseConstructorFunction } from '../utils/validator.js';
import {
  CLASS_NAME_DARK_MODE_TOGGLE_BUTTON,
  CLASS_NAME_FAS,
  CLASS_NAME_FAR,
  CLASS_NAME_MOON_ICON,
  CLASS_NAME_BULB_ICON,
  STORAGE_KEY_NOTION_THEME,
  DARK,
  LIGHT,
} from '../utils/constants.js';

export default function DarkModeToggle({ $target }) {
  const validate = () => {
    checkUseConstructorFunction(new.target, DarkModeToggle);
  };

  validate();

  const $darkModeToggleButtonIcon = createElement('i');
  const userTheme = localStorage.getItem(STORAGE_KEY_NOTION_THEME);
  const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  const changeToggleButtonClass = state => {
    const classListOption = {
      [DARK]: [CLASS_NAME_FAS, CLASS_NAME_MOON_ICON],
      [LIGHT]: [CLASS_NAME_FAR, CLASS_NAME_BULB_ICON],
    };

    if (state === DARK) {
      $darkModeToggleButtonIcon.classList.add(...classListOption[LIGHT]);
      $darkModeToggleButtonIcon.classList.remove(...classListOption[DARK]);
    } else if (state === LIGHT) {
      $darkModeToggleButtonIcon.classList.add(...classListOption[DARK]);
      $darkModeToggleButtonIcon.classList.remove(...classListOption[LIGHT]);
    }

    localStorage.setItem(STORAGE_KEY_NOTION_THEME, state);
    document.documentElement.setAttribute(STORAGE_KEY_NOTION_THEME, state);
  };

  this.state = userTheme || osTheme;

  this.setState = nextState => {
    this.state = nextState;
    changeToggleButtonClass(this.state);
  };

  $darkModeToggleButtonIcon.className = CLASS_NAME_DARK_MODE_TOGGLE_BUTTON;

  $target.appendChild($darkModeToggleButtonIcon);

  window.addEventListener('DOMContentLoaded', e => {
    changeToggleButtonClass(this.state);
  });

  $darkModeToggleButtonIcon.addEventListener('click', e => {
    this.state === DARK ? this.setState(LIGHT) : this.setState(DARK);
  });
}
