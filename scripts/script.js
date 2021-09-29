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
const modalEditInfo = document.querySelector(".modal_type_edit-info");
const modalAddPlace = document.querySelector(".modal_type_add-card");
const formProfile = document.querySelector(".form_place_profile");

/* Кнопки */
const closeButtons = document.querySelectorAll(".form__close-button");
const addButton = document.querySelector(".form__main-button_place_popup-card");
const saveButton = document.querySelector(".form__main-button_place_popup-profile");

/* Инпуты */
const nameInput = document.querySelector(".form__input_value_name");
const jobInput = document.querySelector(".form__input_value_job");
const placeInput = document.querySelector(".form__input_value_place");
const linkInput = document.querySelector(".form__input_value_link");

/* Значения инпутов */
const nickname = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

/* Открыть модальное окно */

function openModal(event) {
    if (event.target.closest('.profile__edit-button')) {
        modalEditInfo.classList.add("modal_open");

        nameInput.value = nickname.textContent;
        jobInput.value = job.textContent;
    }

    if (event.target.closest('.profile__add-button')) {
        modalAddPlace.classList.add("modal_open");
    }
}

/* Закрыть модальное окно */
function closeModal(event) {
    if (event.target.closest('.modal_type_edit-info')) {
        modalEditInfo.classList.remove("modal_open");
    }

    if (event.target.closest('.modal_type_add-card')) {
        modalAddPlace.classList.remove("modal_open");

        placeInput.value = '';
        linkInput.value = '';
    }
}

/* Сохранить информацию профиля */
function saveInfo(event) {
    event.preventDefault();

    nickname.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closeModal(event);
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

    return cardElement;
}

/* Рендеринг карточек */
function renderCard() {
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

    initialCards.push(card);
    cardsElement.innerHTML = '';
    renderCard()

    placeInput.value = '';
    linkInput.value = '';

    closeModal(event);
}

/* Поставить лайк */
function toggleActiveLike(likeButton) {
    likeButton.classList.toggle('card__button_active');
}

/* Удалить карточку */
function removeCard(deleteButtonEl) {
    deleteButtonEl.closest('.card').remove();
}

closeButtons.forEach(item => {
    item.addEventListener("click", closeModal);
});

document.addEventListener('click', openModal);
formProfile.addEventListener("submit", saveInfo);
window.addEventListener('load', renderCard);
addButton.addEventListener('click', addCard);
saveButton.addEventListener('click', saveInfo);
