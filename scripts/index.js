import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import {validationConfig, initialCards} from './data.js';

/* Карточки */
const cardsElement = document.querySelector(".elements__cards");

/* Модальные окна*/
const popupViewCard = document.querySelector(".popup_type_view-image");
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

/* Создать экземпляр класса */
function createClassInstance(cardObj) {
    const card = new Card(cardObj, '.cards-template', handleCardImageClick);
    const cardElement = card.generateCard();
    return cardElement;
}

/* Отрисовать карточки */
function renderCards() {
    initialCards.forEach(cardObj => {
        cardsElement.append(createClassInstance(cardObj));
    })
}

/* Открыть модальное окно */
function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener('keydown', closeByEscape);
}

/* Закрыть модальное окно */
function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener('keydown', closeByEscape);
}

/* Закрытие по нажатию Escape */
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_open');
        closePopup(openedPopup);
    }
}

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

    closePopup(popupEditInfo);
}

/* Добавить карточку */
function addCard(event) {
    event.preventDefault();

    const newCardValues = {
        name: placeInput.value,
        link: linkInput.value
    };

    cardsElement.prepend(createClassInstance(newCardValues));

    clearCardInputs();

    closePopup(popupAddPlace);
}

/* Очистить инпуты */
function clearCardInputs() {
    placeInput.value = '';
    linkInput.value = '';

    cardFormValidate.clearInputsErrors();
}

/* Обработчик закрытия по оверлею */
function handleOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

/* Обработчик клика по картинке */
function handleCardImageClick(link, name) {
    const image = document.querySelector('.popup__image');
    const title = document.querySelector('.popup__image-title');

    image.src = link;
    image.alt = name;
    title.textContent = name;

    openPopup(popupViewCard);
}

/* Слушатель открытия формы редактирования профиля */
popupProfileOpenBtn.addEventListener('click', () => {
    getValueInputs();

    profileFormValidate.clearInputsErrors();
    profileFormValidate.toggleButtonState();

    openPopup(popupEditInfo);
});

/* Слушатель открытия формы добавления карточки */
popupAddCardOpenBtn.addEventListener('click', () => {
    clearCardInputs();

    cardFormValidate.toggleButtonState();

    openPopup(popupAddPlace)
});

/* Слушатели закрытия формы при клике на крестик */
popupViewCardCloseBtn.addEventListener('click', () => closePopup(popupViewCard));
popupProfileCloseBtn.addEventListener('click', () => closePopup(popupEditInfo));
popupAddCardCloseBtn.addEventListener('click', () => closePopup(popupAddPlace));

/* Слушатель закрытия при клике на оверлей */
popupViewCard.addEventListener('click', handleOverlay);
popupEditInfo.addEventListener('click', handleOverlay);
popupAddPlace.addEventListener('click', handleOverlay);

formProfile.addEventListener("submit", saveInfo); /* Сохранить информацию профиля */
formAddCard.addEventListener('submit', addCard); /* Добавить карточку */

window.addEventListener('load', renderCards); /* Отрисовать карточки */

