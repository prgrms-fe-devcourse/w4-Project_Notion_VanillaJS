/*
 * 서버와 연동하는 API
 *
 * Root Documents 가져오기: https://kdt.roto.codes/documents - GET
 * 특정 Document의 content 조회하기: https://kdt.roto.codes/documents/{documentId} - GET
 * Document 생성하기: https://kdt.roto.codes/documents - POST
 * 특정 Document 수정하기: https://kdt.roto.codes/documents/{documentId} - PUT
 * 특정 Document 삭제하기: https://kdt.roto.codes/documents/{documentId} - DELETE
 */
export const API_END_POINT = "https://kdt.roto.codes";

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}/documents`, {
      ...option,
      headers: {
        "x-username": "tory",
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리 중 문제 발생!");
  } catch (e) {
    alert(e.message);
  }
  console.log(await res.json());
};
