const modal = document.querySelector(".modal");

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".form__close-button");

const nameInput = document.querySelector(".form__input_value_name");
const jobInput = document.querySelector(".form__input_value_job");

const nickname = document.querySelector(".profile__title");
const job = document.querySelector(".profile__subtitle");

function openModal() {
    modal.classList.add("modal_open");
    nameInput.value = nickname.textContent;
    jobInput.value = job.textContent;
}

function closeModal(event) {
    event.preventDefault();
    modal.classList.remove("modal_open");
}

editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
