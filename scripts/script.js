/* Карточки */
const cardsElement = document.querySelector(".elements__cards");
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://images.unsplash.com/photo-1566221880968-ad3da1d5fe84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80'
    },
    {
        name: 'Домбай',
        link: 'https://images.unsplash.com/photo-1556780183-f523058dc29b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80'
    },
    {
        name: 'Мыс Нюкля',
        link: 'https://images.unsplash.com/photo-1540903475064-248d0292c635?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=685&q=80'
    },
    {
        name: 'Камчатка',
        link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'
    }
];

/* Модальное окно и форма */
const popupEditInfo = document.querySelector(".popup_type_edit-info");
const popupAddPlace = document.querySelector(".popup_type_add-card");
const popupViewCard = document.querySelector(".popup_type_view-image");
const formProfile = document.querySelector(".form_type_profile");

/* Кнопки */
const popupProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupAddCardOpenBtn = document.querySelector(".profile__add-button");
const popupProfileCloseBtn = document.querySelector(".popup__close-button_place_profile");
const popupAddCardCloseBtn = document.querySelector(".popup__close-button_place_new-card");
const popupViewCardCloseBtn = document.querySelector(".popup__close-button_place_image");
const addButton = document.querySelector(".form__main-button_place_new-card");

/* Инпуты */
const nameInput = document.querySelector(".form__input_value_name");
const jobInput = document.querySelector(".form__input_value_job");
const placeInput = document.querySelector(".form__input_value_place");
const linkInput = document.querySelector(".form__input_value_link");

/* Значения инпутов */
const nickname = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

/* Открыть модальное окно */
function openPopup(popup) {
    popup.classList.add("popup_open");
}

/* Закрыть модальное окно */
function closePopup(popup) {
    popup.classList.remove("popup_open");
}

/* Получить значения инпутов */
function getValueInputs() {
    nameInput.value = nickname.textContent;
    jobInput.value = job.textContent;
}

/* Очистить инпуты */
function clearInputs() {
    placeInput.value = '';
    linkInput.value = '';
}

/* Сохранить информацию профиля */
function saveInfo(event) {
    event.preventDefault();

    nickname.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closePopup(popupEditInfo);
}

/* Создание шаблона карточек */
function createTemplateCard(item) {
    const cardTemplate = document.querySelector('.cards-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = `${item.link}`
    cardImage.alt = `${item.name}`

    const cardTitile = cardElement.querySelector('.card__title');
    cardTitile.textContent = `${item.name}`

    const likeButton = cardElement.querySelector(".card__button_type_like");
    likeButton.addEventListener('click', () => {
        toggleActiveLike(likeButton);
    });

    const deleteButton = cardElement.querySelector(".card__button_type_delete");
    deleteButton.addEventListener('click', (event) => {
        removeCard(event.target);
    });

    cardImage.addEventListener('click', () => {
        const image = document.querySelector('.popup__image');
        const titile = document.querySelector('.popup__image-title');

        image.src = `${item.link}`;
        image.alt = `${item.name}`;
        titile.textContent = `${item.name}`

        openPopup(popupViewCard);
    });

    return cardElement;
}

/* Рендеринг карточек */
function renderCards() {
    initialCards.forEach(item => {
        const cardTemplate = createTemplateCard(item);

        cardsElement.append(cardTemplate);
    })
}

/* Добавить карточку */
function addCard(event) {
    event.preventDefault();

    const card = {};
    card.name = placeInput.value;
    card.link = linkInput.value;

    cardsElement.prepend(createTemplateCard(card))

    clearInputs();

    closePopup(popupAddPlace);
}

/* Поставить лайк */
function toggleActiveLike(likeButton) {
    likeButton.classList.toggle('card__button_active');
}

/* Удалить карточку */
function removeCard(deleteButtonEl) {
    deleteButtonEl.closest('.card').remove();
}

/* Слушатели открытия формы */
popupProfileOpenBtn.addEventListener('click', () => { openPopup(popupEditInfo); getValueInputs() });
popupAddCardOpenBtn.addEventListener('click', () => openPopup(popupAddPlace));

/* Слушатели закрытия формы */
popupProfileCloseBtn.addEventListener('click', () => closePopup(popupEditInfo));
popupAddCardCloseBtn.addEventListener('click', () => { closePopup(popupAddPlace); clearInputs() });
popupViewCardCloseBtn.addEventListener('click', () => closePopup(popupViewCard));

formProfile.addEventListener("submit", saveInfo); /* Сохранить информацию профиля */
window.addEventListener('load', renderCards); /* Отрисовать карточки */
addButton.addEventListener('click', addCard); /* Добавить карточку */
