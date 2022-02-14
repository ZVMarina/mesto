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
}