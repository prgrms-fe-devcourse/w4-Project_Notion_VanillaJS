export const API_END_POINT = 'https://kdt.roto.codes/documents';

export const request = async (options = {}, documentId = '') => {
  try {
    const res = await fetch(`${API_END_POINT}/${documentId}`, {
      headers: {
        'x-username': 'YeonghunKO',
        'content-type': 'application/json',
      },
      ...options,
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 호출중 에러가 발생해부러따나');
  } catch (error) {
    alert(error);
  }
};

// make document
export async function createDocument({ title, parent = null }) {
  try {
    const post = {
      title: title,
      parent,
    };

    const re = await request({
      method: 'POST',
      body: JSON.stringify(post),
    });
    if (re) {
      //   console.log(re);
      return re;
    }
    throw new Error('문서 생성 도중 오류 발생');
  } catch (error) {
    alert(error);
  }
}

export async function getDocuments(
  { documentId: documentId } = { documentId: '' }
) {
  try {
    const re = await request(
      {
        method: 'GET',
      },
      documentId
    );
    if (re) {
      return re;
    }
    throw new Error('문서 불러오는 도중 에러 발생');
  } catch (error) {
    alert(error);
  }
}

export async function editDocument({ documentId, title, content }) {
  try {
    const post = {
      title,
      content,
    };

    const re = await request(
      {
        method: 'PUT',
        body: JSON.stringify(post),
      },
      documentId
    );
    if (re) {
      return await re;
    }
    throw new Error('문서 편집 도중 에러 발생');
  } catch (error) {
    alert(error);
  }
}

// 삭제된 문서의 제목,콘텐트가 리턴됨
// 복구도 가능할듯
export async function deleteDocument({ documentId }) {
  const deletedDocument = await request({ method: 'DELETE' }, documentId);
  return deletedDocument;
}
