export default class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
    }

    enableValidation() {
        this._setEventListeners(this.formElement, this.config);
    }

    /* Добавляет обработчики всем формам и полям */
    _setEventListeners(formElement, { inputSelector, submitButtonSelector, ...rest }) {
        const inputList = formElement.querySelectorAll(inputSelector);
        const submitButton = formElement.querySelector(submitButtonSelector);

        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                const isFormValid = formElement.checkValidity();

                this._checkInputValidity(formElement, inputElement, rest);
                this._toggleButtonState(submitButton, isFormValid, rest);
            })
        })
    }

    /* Найти элемент ошибки */
    _findErrorElement(formElement, inputElement) {
        return formElement.querySelector(`.${inputElement.id}-error`);
    }

    /* Показать ошибку */
    _showError(inputElement, errorElement, { inputErrorClass }) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(inputErrorClass);
    }

    /* Скрыть ошибку */
    _hideError(inputElement, errorElement, { inputErrorClass }) {
        errorElement.textContent = '';
        inputElement.classList.remove(inputErrorClass);
    }

    hideInputsErrors() {
        const inputList = this.formElement.querySelectorAll(this.config.inputSelector);

        inputList.forEach(inputElement => {
            this._hideError(inputElement, this._findErrorElement(this.formElement, inputElement), this.config);
        })
    }

    /* Проверка инпутов на валидность */
    _checkInputValidity(formElement, inputElement, { ...rest }) {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
            this._showError(inputElement, this._findErrorElement(formElement, inputElement), rest);
        } else {
            this._hideError(inputElement, this._findErrorElement(formElement, inputElement), rest);
        }
    }

    /* Активировать/деактивировать кнопку */
    _toggleButtonState(button, isActive, { inactiveButtonClass, ...rest }) {
        if (isActive) {
            button.classList.remove(inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(inactiveButtonClass);
            button.disabled = 'true';
        }
    }
}
