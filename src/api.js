const API_END_POINT = 'https://kdt.roto.codes'
const USER_NAME = 'HongJungKim-dev'
const ROOT = '/documents'

const request = async(url, options = {}) => {
    try {
        const response = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'x-username': USER_NAME
            }
        });
        
        if (!response.ok) {
            throw new Error('api error'); 
        }

        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getDocument = async (documentId = '') => {
    const certainDocumentUrl = documentId ? `/${documentId}`: ''
    return await request(`${ROOT}${certainDocumentUrl}`, {
        metehod: 'GET'
    })
}

const createDocument = async (title = '', parent = null) => {
    return await request(`${ROOT}`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            parent,
        })
    })
}

const editDocument = async (title = '', content = '', documentId = '') => {
    return await request(`${ROOT}/${documentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
        })
    })
}

const removeDocument = async (documentId = '') => {
    return await request(`${ROOT}/${documentId}`, {
        method: 'DELETE'
    })
}

export {  getDocument, createDocument, editDocument, removeDocument }
