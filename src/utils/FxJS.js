export const canGetElementsLater =
    (appliedFunc) =>
    (firstElement, ...remainElements) =>
        remainElements.length
            ? appliedFunc(firstElement, ...remainElements)
            : (...secondElements) => appliedFunc(firstElement, ...secondElements);

export const reduce = canGetElementsLater((appliedFunc, acc, iter) => {
    if (!iter) acc = (iter = acc[Symbol.iterator]()).next().value;
    for (const el of iter) acc = appliedFunc(acc, el);
    return acc;
});

export const revisedReduce = (...elements) => reduce((initialValue, appliedFunc) => appliedFunc(initialValue), elements);

export const lazyFilter = canGetElementsLater(function* (appliedFunc, iter) {
    for (const value of iter) if (appliedFunc(value)) yield value;
});

export const lazyMap = canGetElementsLater(function *(appliedFunc, iter) {
    for (const value of iter) yield appliedFunc(value);
})

export const head = ([a]) => a;

export const take = canGetElementsLater((limiter, iter) => {
    const res = [];
    for (const value of iter) {
        res.push(value);
        if (res.length === limiter) return res;
    }
    return res;
});

export const map = canGetElementsLater(function (appliedFunc, iter) {
    const res = [];
    for (const value of iter) {
        res.push(appliedFunc(value));
    }
    return res;
});