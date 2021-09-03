const stroage = window.localStorage;

export const getItem = (key, defaultValue) => {
    try {
        const storedValue = stroage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch(e) {
        return defaultValue; 
    }
};

export const setItem = (key, value) => {
    stroage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
    stroage.removeItem(key);
}