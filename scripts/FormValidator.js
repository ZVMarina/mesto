export default class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = formElement.querySelectorAll(this.config.inputSelector);
        this.submitButton = formElement.querySelector(this.config.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners(this.formElement, this.config);
    }

    /* Добавляет обработчики всем формам и полям */
    _setEventListeners(formElement, { inputSelector, submitButtonSelector, ...rest }) {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this.inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                const isFormValid = formElement.checkValidity();

                this._checkInputValidity(formElement, inputElement, rest);
                this.toggleButtonState(isFormValid);
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

    clearInputsErrors() {
        this.inputList.forEach(inputElement => {
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
    toggleButtonState(isActive) {
        if (isActive) {
            this.submitButton.classList.remove(this.config.inactiveButtonClass);
            this.submitButton.disabled = false;
        } else {
            this.submitButton.classList.add(this.config.inactiveButtonClass);
            this.submitButton.disabled = 'true';
        }
    }
}
