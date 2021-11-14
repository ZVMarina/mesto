import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import { PopupWithImage, PopupWithForm } from './Popup.js';
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

/* Значения инпутов */
const nickname = document.querySelector(".profile__title");
const jobSubtitle = document.querySelector(".profile__subtitle");

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

/* Получить значения инпутов */
function getValueInputs() {
    nameInput.value = nickname.textContent;
    jobInput.value = jobSubtitle.textContent;
}

/* Сохранить информацию профиля */
function saveInfo(event, { name, job }) {
    event.preventDefault();

    nickname.textContent = name;
    jobSubtitle.textContent = job;
}

/* Добавить карточку */
function addCard(event, {place, link}) {
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
