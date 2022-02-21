export default class Api {
  constructor() {

  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-30/users/me', {
      method: 'GET',
      headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20'
      }
    })
      .then(res => res.json())
      .then((result) => result);
  }

  getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-30/cards', {
      method: 'GET',
      headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20'
      }
    })
      .then(res => res.json())
      .then((result) => result);
  }

  changeProfile(name, about) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-30/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20',
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-30/cards', {
      method: 'POST',
      headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20',
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
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-30/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20',
      }
    })
      .then(res => res.json())
      .then((result) => result);
  }

  changeAvatar(link) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-30/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20',
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
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-30/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20',
      }
    })
      .then(res => res.json())
      .then((result) => result);
  }

  deleteLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-30/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20',
      }
    })
      .then(res => res.json())
      .then((result) => result);
  }
}