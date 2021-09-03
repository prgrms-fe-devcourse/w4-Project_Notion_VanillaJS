const API_END_POINT = `https://kdt.roto.codes/documents`;

export async function getRootDocument() {
  try {
    const res = await fetch(`${API_END_POINT}`, {
      headers: {
        "x-username": `khw`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
}

export async function getContentDocument(documentId) {
  try {
    const res = await fetch(`${API_END_POINT}/${documentId}`, {
      headers: {
        "x-username": `khw`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
}

export async function postDocument(title, documentId = null) {
  try {
    const res = await fetch(`${API_END_POINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-username": `khw`,
      },
      body: JSON.stringify({
        title: `${title}`,
        // parent가 null이면 루트 Document가 됩니다.
        // 특정 Document에 속하게 하려면 parent에
        // 해당 Document id를 넣으세요.
        parent: `${documentId}`,
      }),
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
}

/*
fetch(`https://kdt.roto.codes/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-username": `khw`,
      },
      body: JSON.stringify({
        title: `금요일`,
        // parent가 null이면 루트 Document가 됩니다.
        // 특정 Document에 속하게 하려면 parent에
        // 해당 Document id를 넣으세요.
        parent: null,
      }),
    });
 */

export async function putDocument(title, documentId, content) {
  try {
    const res = await fetch(`${API_END_POINT}/${documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-username": `khw`,
      },
      body: JSON.stringify({
        title: `${title}`,
        // parent가 null이면 루트 Document가 됩니다.
        // 특정 Document에 속하게 하려면 parent에
        // 해당 Document id를 넣으세요.
        content: `${content}`,
      }),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
}

/*
fetch(`https://kdt.roto.codes/documents/8126`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-username": `khw`,
      },
      body: JSON.stringify({
        title: `기하와벡터`,
        // parent가 null이면 루트 Document가 됩니다.
        // 특정 Document에 속하게 하려면 parent에
        // 해당 Document id를 넣으세요.
        content: `기하와벡터 공부해야하는데 난 안할래`,
      }),
    });
 */

export async function deleteDocument(documentId) {
  try {
    const res = await fetch(`${API_END_POINT}/${documentId}`, {
      method: "DELETE",
      headers: {
        "x-username": `khw`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
}

/*
fetch(`https://kdt.roto.codes/documents/7753`, {
      method: "DELETE",
      headers: {
        "x-username": `khw`,
      },
    });
 */
