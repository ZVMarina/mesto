import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import {PopupWithImage, PopupWithForm} from './Popup.js';
import { validationConfig, initialCards } from './data.js';

const popupEditInfo = document.querySelector(".popup_type_edit-info");
const popupAddPlace = document.querySelector(".popup_type_add-card");

/* Формы */
const formProfile = document.querySelector(".form_type_profile");
const formAddCard = document.querySelector(".form_type_new-card");

/* Кнопки */
const popupProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupAddCardOpenBtn = document.querySelector(".profile__add-button");
const popupProfileCloseBtn = document.querySelector(".popup__close-button_place_profile");
const popupAddCardCloseBtn = document.querySelector(".popup__close-button_place_new-card");
const popupViewCardCloseBtn = document.querySelector(".popup__close-button_place_image");

/* Инпуты */
const nameInput = document.querySelector(".form__input_value_name");
const jobInput = document.querySelector(".form__input_value_job");
const placeInput = document.querySelector(".form__input_value_place");
const linkInput = document.querySelector(".form__input_value_link");

/* Значения инпутов */
const nickname = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

/* Экземпляры класса FormValidator */
const cardFormValidate = new FormValidator(validationConfig, formAddCard);
const profileFormValidate = new FormValidator(validationConfig, formProfile);

cardFormValidate.enableValidation();
profileFormValidate.enableValidation();

const popupImage = new PopupWithImage('.popup_type_view-image');
const popupFormEdit = new PopupWithForm('.popup_type_edit-info', saveInfo, handleClearInputsErrors);
const popupFormAdd = new PopupWithForm('.popup_type_add-card', addCard, handleClearInputsErrors);

/* Получить значения инпутов */
function getValueInputs() {
    nameInput.value = nickname.textContent;
    jobInput.value = job.textContent;
}

/* Сохранить информацию профиля */
function saveInfo(event) {
    event.preventDefault();

    nickname.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

/* Добавить карточку */
function addCard(event) {
    event.preventDefault();

    const newCardValues = {
        name: placeInput.value,
        link: linkInput.value
    };

    rendererCard(newCardValues);
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

/* Экземпляр карточки */
const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        rendererCard(cardItem)
    }
}, '.elements__cards');

function rendererCard(cardItem) {
    const card = new Card(cardItem, '.cards-template', handleCardImageClick);
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
}


cardsList.renderCards();
