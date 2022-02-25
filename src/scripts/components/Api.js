export default class Api {
  constructor({ baseUrl, authorizationKey }) {
    this.baseUrl = baseUrl;
    this.authorizationKey = authorizationKey;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this.authorizationKey
      }
    })
      .then(res => res.json())
      .then((result) => result);
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.authorizationKey
      }
    })
      .then(res => res.json())
      .then((result) => result);
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
      .then(res => res.json())
      .then((result) => result);
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
      .then(res => res.json())
      .then((result) => result);
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorizationKey,
      }
    })
      .then(res => res.json())
      .then((result) => result);
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
      .then(res => res.json())
      .then((result) => result);
  }

  putLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.authorizationKey,
      }
    })
      .then(res => res.json())
      .then((result) => result);
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorizationKey,
      }
    })
      .then(res => res.json())
      .then((result) => result);
  }
}