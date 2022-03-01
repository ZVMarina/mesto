export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }

    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(this._getResponseData)
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(this._getResponseData)
  }

  changeProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._getResponseData)
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._getResponseData)
  }

  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(this._getResponseData)
  }

  putLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(this._getResponseData)
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._getResponseData)
  }
}