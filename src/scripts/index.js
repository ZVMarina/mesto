import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import { PopupWithImage, PopupWithForm } from './components/Popup.js';
import { validationConfig, initialCards } from './data.js';

/* Формы */
const formProfile = document.querySelector(".form_type_profile");
const formAddCard = document.querySelector(".form_type_new-card");

/* Кнопки */
const popupProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupAddCardOpenBtn = document.querySelector(".profile__add-button");

/* Инпуты */
const nameInput = document.querySelector(".form__input_value_name");
const jobInput = document.querySelector(".form__input_value_job");

/* Экземпляры класса FormValidator */
const cardFormValidate = new FormValidator(validationConfig, formAddCard);
const profileFormValidate = new FormValidator(validationConfig, formProfile);

cardFormValidate.enableValidation();
profileFormValidate.enableValidation();

const sectionData = {
    items: initialCards,
    renderer: (cardItem) => {
        rendererCard(cardItem)
    }
}

const cardsList = new Section(sectionData, '.elements__cards');

const popupImage = new PopupWithImage('.popup_type_view-image');
const popupFormEdit = new PopupWithForm('.popup_type_edit-info', saveInfo, handleClearInputsErrors);
const popupFormAdd = new PopupWithForm('.popup_type_add-card', addCard, handleClearInputsErrors);

const userInfo = new UserInfo({nameSelector: '.profile__title', infoSelector: '.profile__subtitle'});

/* Получить значения инпутов */
function getValueInputs() {
    const information = userInfo.getUserInfo();
    nameInput.value = information.name;
    jobInput.value = information.info;
}

/* Сохранить информацию профиля */
function saveInfo(event, { name, job }) {
    event.preventDefault();

    userInfo.setUserInfo(name, job);
}

/* Добавить карточку */
function addCard(event, { place, link }) {
    event.preventDefault();

    const newCardValues = {
        name: place,
        link: link
    };

    rendererCard(newCardValues);
}

/* Отрисовать карточку */
function rendererCard(cardItem) {
    const card = new Card(cardItem, '.cards-template', handleCardImageClick);
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
}

/* Очистить инпуты */
function handleClearInputsErrors() {
    cardFormValidate.clearInputsErrors();
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

    popupFormAdd.open();
});


cardsList.renderCards();
