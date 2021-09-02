const API_END_POINT = "https://kdt.roto.codes";
const USER_NAME = "naeunchan";

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "x-username": USER_NAME,
            },
        });

        if (res.ok) {
            return await res.json();
        }

        throw new Error("API Error!");
    } catch (e) {
        alert(e.message);
    }
};

export const getUserName = () => {
    return USER_NAME;
};
