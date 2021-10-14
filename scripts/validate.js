/* Найти элемент ошибки */
const findErrorElement = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    return errorElement;
}

/* Показать ошибку */
const showError = (inputElement, errorElement) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add('form__input_state_invalid');
}
/* Скрыть ошибку */
const hideError = (inputElement, errorElement) => {
    errorElement.textContent = '';
    inputElement.classList.remove('form__input_state_invalid');
}

/* Проверка инпутов на валидность */
const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        showError(inputElement, findErrorElement(formElement, inputElement));
    } else {
        hideError(inputElement, findErrorElement(formElement, inputElement));
    }
}

/* Активировать/деактивировать кнопку */
const toggleButtonState = (button, isActive) => {
    if (isActive) {
        button.classList.remove('form__main-button_invalid');
        button.disabled = false;
    } else {
        button.classList.add('form__main-button_invalid');
        button.disabled = 'true';
    }
}

/* Добавляет обработчики всем формам и полям */
const setEventListeners = (formElement) => {
    const inputList = formElement.querySelectorAll('.form__input');
    const submitButton = formElement.querySelector('.form__main-button');

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();

            checkInputValidity(formElement, inputElement);
            toggleButtonState(submitButton, isFormValid);
        })
    })

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
}

/* Находит и обрабатывает все формы */
const enableValidation = () => {
    const forms = document.querySelectorAll('.form');

    forms.forEach(formElement => {
        setEventListeners(formElement);
    })
}

enableValidation();
