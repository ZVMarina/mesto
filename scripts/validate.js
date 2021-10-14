const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__main-button',
    inactiveButtonClass: 'form__main-button_invalid',
    inputErrorClass: 'form__input_state_invalid'
  };

/* Найти элемент ошибки */
const findErrorElement = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    return errorElement;
}

/* Показать ошибку */
const showError = (inputElement, errorElement, validationConfig) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(validationConfig.inputErrorClass);
}
/* Скрыть ошибку */
const hideError = (inputElement, errorElement, validationConfig) => {
    errorElement.textContent = '';
    inputElement.classList.remove(validationConfig.inputErrorClass);
}

/* Проверка инпутов на валидность */
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        showError(inputElement, findErrorElement(formElement, inputElement), validationConfig,);
    } else {
        hideError(inputElement, findErrorElement(formElement, inputElement), validationConfig,);
    }
}

/* Активировать/деактивировать кнопку */
const toggleButtonState = (button, isActive, validationConfig) => {
    if (isActive) {
        button.classList.remove(validationConfig.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(validationConfig.inactiveButtonClass);
        button.disabled = 'true';
    }
}

/* Добавляет обработчики всем формам и полям */
const setEventListeners = (formElement, validationConfig) => {
    const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();

            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(submitButton, isFormValid, validationConfig);
        })
    })

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
}

/* Находит и обрабатывает все формы */
const enableValidation = (validationConfig) => {
    const forms = document.querySelectorAll(validationConfig.formSelector);

    forms.forEach(formElement => {
        setEventListeners(formElement, validationConfig);
    })
}

enableValidation(validationConfig);
