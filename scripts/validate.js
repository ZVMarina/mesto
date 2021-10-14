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
const showError = (inputElement, errorElement, {inputErrorClass}) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass);
}
/* Скрыть ошибку */
const hideError = (inputElement, errorElement, {inputErrorClass}) => {
    errorElement.textContent = '';
    inputElement.classList.remove(inputErrorClass);
}

/* Проверка инпутов на валидность */
const checkInputValidity = (formElement, inputElement, {...rest}) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        showError(inputElement, findErrorElement(formElement, inputElement), rest);
    } else {
        hideError(inputElement, findErrorElement(formElement, inputElement), rest);
    }
}

/* Активировать/деактивировать кнопку */
const toggleButtonState = (button, isActive, {inactiveButtonClass, ...rest}) => {
    if (isActive) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = 'true';
    }
}

/* Добавляет обработчики всем формам и полям */
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = formElement.querySelectorAll(inputSelector);
    const submitButton = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();

            checkInputValidity(formElement, inputElement, rest);
            toggleButtonState(submitButton, isFormValid, rest);
        })
    })
}

/* Находит и обрабатывает все формы */
const enableValidation = ({formSelector, ...rest}) => {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(formElement => {
        setEventListeners(formElement, rest);
    })
}

enableValidation(validationConfig);
