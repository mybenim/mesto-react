class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: `${this._authorization}`,
            },
        }).then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: data.fullname,
              about: data.job
          }),
      }).then(this._checkResponse);

    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkResponse);
      }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            // body: JSON.stringify({
            //     name: data.name,
            //     link: data.link
            // })
            body: JSON.stringify(data)
        }).then(this._checkResponse);
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization:this._authorization
            }
        }).then(this._checkResponse);
}

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
               authorization: this._authorization
            }
        }).then(this._checkResponse);
      }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        }).then(this._checkResponse);
    }
}

// Создан экземпляр класса Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-71",
  headers: {
    authorization: "e164ebe0-cf4e-493a-bf1c-60f1f87f2b77",
    "Content-Type": "application/json"
  }
});

export default api;
