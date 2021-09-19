/* Модальное окно и форма */
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");

/* Кнопки */
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".form__close-button");

/* Инпуты */
const nameInput = document.querySelector(".form__input_value_name");
const jobInput = document.querySelector(".form__input_value_job");

/* Значения инпутов */
const nickname = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

/* Открыть модальное окно */
function openModal() {
    modal.classList.add("modal_open");

    nameInput.value = nickname.textContent;
    jobInput.value = job.textContent;
}

/* Закрыть модальное окно */
function closeModal(event) {
    modal.classList.remove("modal_open");
}

/* Сохранить информацию */
function saveInfo(event) {
    event.preventDefault();

    nickname.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closeModal(event);
}

/* Слушатели событий */
editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
form.addEventListener("submit", saveInfo);
