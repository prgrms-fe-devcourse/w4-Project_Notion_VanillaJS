const API_ENDPOINT = "https://kdt.roto.codes/documents/";
const options = (method, data) => {
  switch (method) {
    case "GET":
    case "DELET": {
      return {
        method,
        headers: {
          "x-username": "SeonjaeLee",
        },
      };
    }
    default: {
      return {
        method,
        headers: {
          "x-username": "SeonjaeLee",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    }
  }
};

export const createDocument = (data) => {
  return fetch(`${API_ENDPOINT}`, options("POST", data)).then((res) =>
    res.json()
  );
};

export const getDocument = (id = "") => {
  return fetch(`${API_ENDPOINT}${id}`, options("GET")).then((res) =>
    res.json()
  );
};

export const modifyDocument = (id, data) => {
  return fetch(`${API_ENDPOINT}${id}`, options("PUT", data)).then((res) =>
    res.json()
  );
};

export const deleteDocument = (id) => {
  return fetch(`${API_ENDPOINT}${id}`, options("DELETE")).then((res) =>
    res.json()
  );
};
