import { $, createElement } from '../utils/dom.js';

export const TOAST_SUCCESS_TYPE = 'TOAST_SUCCESS_TYPE';
export const TOAST_FAIL_TYPE = 'TOAST_FAIL_TYPE';

const TOAST_SUCCESS_ICON = '✔';
const TOAST_SUCCESS_STATUS = 'Success';
const TOAST_SUCCESS_CLASSNAME = 'success';

const TOAST_FAIL_ICON = '×';
const TOAST_FAIL_STATUS = 'Fail';
const TOAST_FAIL_CLASSNAME = 'fail';

const APPEAR_POSITION = '0';
const DISAPPEAR_POSITION = '400px';

const moveToLeft = ($toast, delay = 150) => new Promise((resolve) => {
  setTimeout(() => {
    $toast.style.transform = `translateX(${APPEAR_POSITION})`;
    resolve();
  }, delay);
});

const moveToRight = ($toast, delay) => new Promise((resolve) => {
  setTimeout(() => {
    $toast.style.transform = `translateX(${DISAPPEAR_POSITION})`;
    resolve();
  }, delay);
});

const removeToastWrapper = ($body, $wrapper, delay) => new Promise((resolve) => {
  setTimeout(() => {
    $body.removeChild($wrapper);
    resolve();
  }, delay);
});

export default function Toast({
  type,
  message,
  delay = 2000,
}) {
  const $wrapper = createElement('div', {
    class: 'toast-wrapper',
  });

  const toastProperty = type === TOAST_SUCCESS_TYPE
    ? {
      icon: TOAST_SUCCESS_ICON,
      status: TOAST_SUCCESS_STATUS,
      className: TOAST_SUCCESS_CLASSNAME,
    }
    : {
      icon: TOAST_FAIL_ICON,
      status: TOAST_FAIL_STATUS,
      className: TOAST_FAIL_CLASSNAME,
    };

  const { icon, status, className } = toastProperty;

  this.render = async () => {
    $wrapper.innerHTML = `
      <div id="toast" class=${className}>
        <div class="container-1">
          <span>${icon}<sapn>
        </div>
        <div class="container-2">
          <p>${status}</p>
          <p>${message}</p>
        </div>
      </div>
    `;

    const $body = $('body');
    $body.appendChild($wrapper);

    const $toast = $('#toast', $wrapper);

    await moveToLeft($toast, 150);
    await moveToRight($toast, delay);
    await removeToastWrapper($body, $wrapper, delay);
  };

  this.render();
}
