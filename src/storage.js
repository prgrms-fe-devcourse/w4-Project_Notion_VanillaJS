const storage = window.localStorage

const getItem = (key, defaultValue = []) => {
    try {
        const savedValue = storage.getItem(key)

        if (!savedValue) {
            return defaultValue
        }

        return JSON.parse(savedValue)
    } catch(error) {
        console.log(error)
        return defaultValue
    }
}

const setItem = (key, value) => {
    try {
        storage.setItem(key, JSON.stringify(value))
    } catch(error) {
        console.log(error)
    }
}

export { getItem, setItem }
