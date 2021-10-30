import Card from './Card.js';

const cardsElement = document.querySelector(".elements__cards");
const popupViewCard = document.querySelector(".popup_type_view-image");

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

function renderCards() {
    initialCards.forEach(item => {
        const card = new Card(item, '.cards-template');
        const cardElement = card.generateCard();

        cardsElement.append(cardElement);
    })
}

/* Открыть модальное окно */
function openPopup(popup) {
    popup.classList.add("popup_open");
    /* document.addEventListener('keydown', closeByEscape); */
}

/* Закрыть модальное окно */
function closePopup(popup) {
    popup.classList.remove("popup_open");
    /* document.removeEventListener('keydown', closeByEscape); */
}

window.addEventListener('load', renderCards); /* Отрисовать карточки */
cardsElement.addEventListener('click', (event) => {
    const image = document.querySelector('.popup__image');
    const title = document.querySelector('.popup__image-title');

    if (event.target.closest('.card__image')) {
        image.src = `${event.target.src}`;
        image.alt = `${event.target.alt}`;
        title.textContent = `${event.target.alt}`;

        openPopup(popupViewCard);
    }
})
