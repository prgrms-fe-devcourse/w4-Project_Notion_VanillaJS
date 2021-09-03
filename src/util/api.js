const API_END_POINT = `https://Kdt.roto.codes`;
const userName = "alajillo";

export function getUserName() {
  return userName;
}
export async function getDocumentsList() {
  try {
    const result = await fetch(`${API_END_POINT}/documents`, {
      headers: { "x-username": userName },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (e) {
    alert("서버와 통신 원할하지않습니다.");
  }
}

export async function getDocumentById(id) {
  try {
    const result = await fetch(`${API_END_POINT}/documents/${id}`, {
      headers: { "x-username": userName },
    });
    if (!result.ok) throw new Error("존재하지 않는 문서입니다.");
    return result.json();
  } catch (e) {
    console.log(e.message);
  }
}

export async function updateDocumentById({ id, title, content }) {
  try {
    await fetch(`${API_END_POINT}/documents/${id}`, {
      headers: { "x-username": userName, "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        title: title,
        content: JSON.stringify(content),
      }),
    });
  } catch (e) {
    alert("서버와 통신이 원활하지않습니다.");
  }
}

export async function createDocument(parent = null) {
  try {
    let title = "new";
    if (parent) title = `${parent.title}'s child`;
    const result = await fetch(`${API_END_POINT}/documents`, {
      method: "POST",
      headers: { "x-username": userName, "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        parent,
      }),
    });
    return result.json();
  } catch (e) {
    alert("서버와 통신 원할하지않습니다.");
  }
}

export async function deleteDocument(id) {
  if (id === 12835) {
    alert("🥺");
    return;
  }
  try {
    await fetch(`${API_END_POINT}/documents/${id}`, {
      method: "DELETE",
      headers: { "x-username": userName },
    });
  } catch (e) {
    alert("서버와 통신 원할하지않습니다.");
  }
}
