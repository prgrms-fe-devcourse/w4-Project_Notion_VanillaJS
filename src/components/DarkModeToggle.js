import { createElement } from '../utils/dom.js';
import { checkUseConstructorFunction } from '../utils/validator.js';
import { CLASS_NAME, GENERAL } from '../utils/constants.js';

export default function DarkModeToggle({ $target }) {
  const validate = () => {
    checkUseConstructorFunction(new.target, DarkModeToggle);
  };

  validate();

  const $darkModeToggleButtonIcon = createElement('i');
  const userTheme = localStorage.getItem(GENERAL.STORAGE_KEY_NOTION_THEME);
  const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? GENERAL.DARK : GENERAL.LIGHT;
  const changeToggleButtonClass = state => {
    const classListOption = {
      [GENERAL.DARK]: [CLASS_NAME.FAS, CLASS_NAME.MOON_ICON],
      [GENERAL.LIGHT]: [CLASS_NAME.FAR, CLASS_NAME.BULB_ICON],
    };

    if (state === GENERAL.DARK) {
      $darkModeToggleButtonIcon.classList.add(...classListOption[GENERAL.LIGHT]);
      $darkModeToggleButtonIcon.classList.remove(...classListOption[GENERAL.DARK]);
    } else if (state === GENERAL.LIGHT) {
      $darkModeToggleButtonIcon.classList.add(...classListOption[GENERAL.DARK]);
      $darkModeToggleButtonIcon.classList.remove(...classListOption[GENERAL.LIGHT]);
    }

    localStorage.setItem(GENERAL.STORAGE_KEY_NOTION_THEME, state);
    document.documentElement.setAttribute(GENERAL.STORAGE_KEY_NOTION_THEME, state);
  };

  this.state = userTheme || osTheme;

  this.setState = nextState => {
    this.state = nextState;
    changeToggleButtonClass(this.state);
  };

  $darkModeToggleButtonIcon.className = CLASS_NAME.DARK_MODE_TOGGLE_BUTTON;

  $target.appendChild($darkModeToggleButtonIcon);

  window.addEventListener('DOMContentLoaded', e => {
    changeToggleButtonClass(this.state);
  });

  $darkModeToggleButtonIcon.addEventListener('click', e => {
    this.state === GENERAL.DARK ? this.setState(GENERAL.LIGHT) : this.setState(GENERAL.DARK);
  });
}
