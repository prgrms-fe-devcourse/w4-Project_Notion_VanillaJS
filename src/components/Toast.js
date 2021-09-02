export const TOAST_SUCCESS_TYPE = 'TOAST_SUCCESS_TYPE';
export const TOAST_FAIL_TYPE = 'TOAST_FAIL_TYPE';

const TOAST_SUCCESS_ICON = '✔';
const TOAST_SUCCESS_STATUS = 'Success';
const TOAST_SUCCESS_CLASSNAME = 'success';

const TOAST_FAIL_ICON = '×';
const TOAST_FAIL_STATUS = 'Fail';
const TOAST_FAIL_CLASSNAME = 'fail';

export default function Toast({
  type,
  message,
  delay = 2000,
}) {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('class', 'toast-wrapper');

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

  this.render = () => {
    const $body = document.querySelector('body');

    $body.appendChild($wrapper);
    $wrapper.innerHTML = `
      <div id="toast">
        <div class="container-1">
          <span>${icon}<sapn>
        </div>
        <div class="container-2">
          <p>${status}</p>
          <p>${message}</p>
        </div>
      </div>
    `;

    const $toast = $wrapper.querySelector('#toast');
    $toast.setAttribute('class', className);

    setTimeout(() => {
      $toast.style.transform = 'translateX(0)';
      setTimeout(() => {
        $toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
          $body.removeChild($wrapper);
        }, delay);
      }, delay);
    }, 150);
  };

  this.render();
}
