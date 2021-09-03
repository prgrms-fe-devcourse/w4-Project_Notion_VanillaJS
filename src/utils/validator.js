import { ERROR_MESSAGE } from './constants.js';

export const isEmpty = data => {
  if (data === null || data === undefined || data === '') {
    return true;
  }

  return false;
};

export const isArray = arr => Array.isArray(arr);

export const isEmptyArray = arr => {
  if (!isArray(arr)) {
    return true;
  }

  return arr.length === 0;
};

export const isCorrectType = (value, type) => {
  if (typeof value === type) {
    return true;
  }

  return false;
};

export const isLessThanGivenLength = (value, length) => {
  if (value?.length < length) {
    alert(`최소 ${length}자 입력해야 합니다.`);
    return false;
  }

  return true;
};

export const isEmptyObject = obj => {
  return Object.keys(obj).length === 0;
};

export const checkUseConstructorFunction = (newTarget, constructorFunction) => {
  if (newTarget !== constructorFunction || !isCorrectType(constructorFunction, 'function')) {
    throw new Error(ERROR_MESSAGE.IS_CONSTRUCTOR_FUNCTION);
  }
};

export const checkIsArrayThrowError = arr => {
  if (!isArray(arr)) {
    throw new Error(`${ERROR_MESSAGE.INVALID_TYPE_ARRAY} ${typeof arr}`);
  }
};

export const checkIsEmptyThrowError = value => {
  if (isEmpty(value)) {
    throw new Error(ERROR_MESSAGE.EMPTY_VALUE);
  }
};

export const checkCorrectTypeThrowError = (value, type) => {
  if (!isCorrectType(value, type)) {
    throw new Error(`${ERROR_MESSAGE.INVALID_TYPE} ${typeof value} / ${ERROR_MESSAGE.EXPECT_TYPE} ${type}`);
  }
};
