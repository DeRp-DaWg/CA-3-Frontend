export const backendAPIURL = "http://localhost:8080/api/"

export function fetchURL(URL, data) {
  if (!data) data = dataFactory("GET")
  return fetch(URL, data)
    .then((response) => response.json())
    .then((data) => {return data})
}

export function dataFactory(method, body, headers) {
  const dataobj = {
    "method": method,
  }
  if (headers) {
    dataobj.headers = headers
  } else {
    dataobj.headers = {}
  }
  if (body) {
    dataobj.body = JSON.stringify(body)
  }
  dataobj["headers"]["Content-Type"] = "application/json"
  return dataobj
}
