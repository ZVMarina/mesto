export default class Api {
  constructor({ baseUrl, authorizationKey }) {
    this.baseUrl = baseUrl;
    this.authorizationKey = authorizationKey;
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
      headers: {
        authorization: this.authorizationKey
      }
    })
      .then(res => this._getResponseData(res))
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.authorizationKey
      }
    })
      .then(res => this._getResponseData(res))
  }

  changeProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorizationKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._getResponseData(res))
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authorizationKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res))
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorizationKey,
      }
    })
      .then(res => this._getResponseData(res))
  }

  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorizationKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(res => this._getResponseData(res))
  }

  putLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.authorizationKey,
      }
    })
      .then(res => this._getResponseData(res))
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorizationKey,
      }
    })
      .then(res => this._getResponseData(res))
  }
}