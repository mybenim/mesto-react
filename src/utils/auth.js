const baseURL = "https://auth.nomoreparties.co";

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
}

export function registration(password, email) {
  return fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password: password, email: email })
  })
  .then((res) => getResponseData(res));
}

export function authorization(password, email) {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password: password, email: email })
  })
  .then((res) => getResponseData(res));
}

export function getUserData(token) {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }})
  .then((res) => getResponseData(res));
}