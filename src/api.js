import { API_END_POINT } from "./constant";
import { USER_NAME } from "./constant";

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'x-username': USER_NAME
            }
        })

        if (res.ok) {
            return res.json();
        }

        throw new Error('API 처리 중 뭔가 이상해요!');
    } catch(e) {
        console.error(e.message);
    }
}
