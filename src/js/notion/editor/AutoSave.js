import {request} from '../../utils/api.js';
import {setItem, removeItem} from '../../utils/storage.js';

export const autoSave = (post, postLocalSaveKey, timer) => {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
            ...post,
        });
        await request(`/documents/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
        });

        // history.pushState(null, null, `/documents/${post.id}`);
        removeItem(postLocalSaveKey);
    });
};
