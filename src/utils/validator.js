import {
  ERROR_MSG_IS_CONSTRUCTOR_FUNCTION,
  ERROR_MSG_EMPTY_VALUE,
  ERROR_MSG_INVALID_TYPE,
  ERROR_MSG_EXPECT_TYPE,
  ERROR_MSG_INVALID_TYPE_ARRAY,
} from './constants.js';

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
    throw new Error(ERROR_MSG_IS_CONSTRUCTOR_FUNCTION);
  }
};

export const checkIsArrayThrowError = arr => {
  if (!isArray(arr)) {
    throw new Error(`${ERROR_MSG_INVALID_TYPE_ARRAY} ${typeof arr}`);
  }
};

export const checkIsEmptyThrowError = value => {
  if (isEmpty(value)) {
    throw new Error(ERROR_MSG_EMPTY_VALUE);
  }
};

export const checkCorrectTypeThrowError = (value, type) => {
  if (!isCorrectType(value, type)) {
    throw new Error(`${ERROR_MSG_INVALID_TYPE} ${typeof value} / ${ERROR_MSG_EXPECT_TYPE} ${type}`);
  }
};
