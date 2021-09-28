/* Модальное окно и форма */
const modalEdit = document.querySelector(".modal_edit-info");
const modalAdd = document.querySelector(".modal_add-place");
const forms = document.querySelectorAll(".form");

/* Кнопки */
const closeButtons = document.querySelectorAll(".form__close-button");

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
        modalEdit.classList.add("modal_open");

        nameInput.value = nickname.textContent;
        jobInput.value = job.textContent;
    }

    if (event.target.closest('.profile__add-button')) {
        modalAdd.classList.add("modal_open");
    }
}

/* Закрыть модальное окно */
function closeModal(event) {
    if (event.target.closest('.modal_edit-info')) {
        modalEdit.classList.remove("modal_open");
    }

    if (event.target.closest('.modal_add-place')) {
        modalAdd.classList.remove("modal_open");
    }
}

/* Сохранить информацию */
function saveInfo(event) {
    if (event.target.closest('.modal_edit-info')) {
        event.preventDefault();

        nickname.textContent = nameInput.value;
        job.textContent = jobInput.value;
    }

    if (event.target.closest('.modal_add-place')) {
        event.preventDefault();
    }

    closeModal(event);
}

closeButtons.forEach(item => {
    item.addEventListener("click", closeModal);
});

forms.forEach(item => {
    item.addEventListener("submit", saveInfo);
});

document.addEventListener('click', openModal);
