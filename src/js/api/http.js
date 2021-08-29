const headers = {
  "x-username": "dorr",
  "Content-Type": "application/json",
}

const HTTP_METHODS = {
  GET() {
    return {
      method: "GET",
      headers,
    }
  },

  POST(data) {
    return {
      method: "POST",
      headers,
      body: JSON.stringify({ ...data })
    }
  },

  PUT(data) {
    return {
    method: "PUT",
    headers,
    body: JSON.stringify({ ...data })
    }
  },

  DELETE() {
    return {
      method: "DELETE",
      headers,
    }
  },
}

export default HTTP_METHODS
