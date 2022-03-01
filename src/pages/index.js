import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm';
import PopupWithImage from '../scripts/components/PopupWithImage';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm';
import Api from '../scripts/components/Api';
import { validationConfig, initialCards } from '../scripts/data.js';
import '../pages/index.css'

let myId;

/* Формы и модалки */
const formProfile = document.querySelector(".form_type_profile");
const formAddCard = document.querySelector(".form_type_new-card");
const formAvatar = document.querySelector(".form_type_change-profile");

/* Кнопки */
const popupProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupAddCardOpenBtn = document.querySelector(".profile__add-button");
const popupChangeAvatarOpenBtn = document.querySelector(".profile__avatar-container");
const profileMainBtn = document.querySelector(".form__main-button_place_profile");
const avatarMainBtn = document.querySelector(".form__main-button_place_change-profile");
const cardMainBtn = document.querySelector(".form__main-button_place_new-card");

/* Инпуты */
const nameInput = document.querySelector(".form__input_value_name");
const jobInput = document.querySelector(".form__input_value_job");

/* Экземпляры класса FormValidator */
const cardFormValidate = new FormValidator(validationConfig, formAddCard);
const profileFormValidate = new FormValidator(validationConfig, formProfile);
const avatarFormValidate = new FormValidator(validationConfig, formAvatar);

cardFormValidate.enableValidation();
profileFormValidate.enableValidation();
avatarFormValidate.enableValidation();

const sectionData = {
    items: initialCards,
    renderer: (cardItem) => {
        rendererCard(cardItem)
    }
}

const cardsList = new Section(sectionData, '.elements__cards');

const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: '5bae0af6-58f0-4b05-8e26-60f5e85b4d20',
        'Content-Type': 'application/json'
      }
}

const api = new Api(apiConfig);

const popupImage = new PopupWithImage('.popup_type_view-image');
const popupConfirm = new PopupWithConfirm('.popup_type_confirm');
const popupFormEdit = new PopupWithForm('.popup_type_edit-info', saveInfo);
const popupFormAdd = new PopupWithForm('.popup_type_add-card', addCard);
const popupFormAvatar = new PopupWithForm('.popup_type_change-profile', saveAvatar);

const userInfo = new UserInfo({ nameSelector: '.profile__title', infoSelector: '.profile__subtitle', avatarSelector: '.profile__avatar' });

/* Получить значения инпутов */
function getValueInputs() {
    const information = userInfo.getUserInfo();
    nameInput.value = information.name;
    jobInput.value = information.info;
}

/* Сохранить информацию профиля */
function saveInfo(event, { name, job }) {
    event.preventDefault();

    profileMainBtn.textContent = 'Сохранить...';

    return api.changeProfile(name, job)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
        })
        .finally(res => {
            profileMainBtn.textContent = 'Сохранить';
        })
}

/* Добавить карточку */
function addCard(event, { name, link }) {
    event.preventDefault();

    cardMainBtn.textContent = 'Создание...';
    cardMainBtn.setAttribute('disabled', 'true');

    return api.addNewCard(name, link)
        .then(res => {
            const newCardValues = {
                ...res,
                _myId: myId
            };

            rendererCard(newCardValues)
        })
        .finally(res => {
            cardMainBtn.textContent = 'Сохранить';
            cardMainBtn.removeAttribute('disabled');
        })

}

/* Сохранить аватар */
function saveAvatar(event, { link }) {
    event.preventDefault();

    avatarMainBtn.textContent = 'Сохранить...';

    api.changeAvatar(link)
        .then(res => {
            userInfo.setAvatar(res.avatar);
        })
        .finally(res => {
            avatarMainBtn.textContent = 'Сохранить';
        })
}

/* Создать карточку */
function createCard(item) {
    return new Card(item, myId, '.cards-template', handleCardImageClick, api, popupConfirm).generateCard();
}

/* Отрисовать карточку */
function rendererCard(cardItem) {
    const cardElement = createCard(cardItem);
    cardsList.addItem(cardElement);
}

/* Обработчик клика по картинке */
function handleCardImageClick(link, name) {
    popupImage.open(link, name);
}


/* Слушатель открытия формы редактирования профиля */
popupProfileOpenBtn.addEventListener('click', () => {
    getValueInputs();

    profileFormValidate.clearInputsErrors();
    profileFormValidate.toggleButtonState();

    popupFormEdit.open();
});

/* Слушатель открытия формы добавления карточки */
popupAddCardOpenBtn.addEventListener('click', () => {
    cardFormValidate.toggleButtonState();
    cardFormValidate.clearInputsErrors();

    popupFormAdd.open();
});

/* Слушатель открытия формы изменения аватара */
popupChangeAvatarOpenBtn.addEventListener('click', () => {
    avatarFormValidate.clearInputsErrors();
    avatarFormValidate.toggleButtonState();

    popupFormAvatar.open();
});

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([info, cards]) => {
        myId = info._id;
        
        userInfo.setUserInfo(info.name, info.about);
        userInfo.setAvatar(info.avatar)
        cardsList.renderCards(cards.reverse());
    })
    .catch(error => {
        console.log(error);
    })
