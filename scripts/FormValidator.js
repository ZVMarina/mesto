export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this.formElement = formElement;
        this.inputList = formElement.querySelectorAll(this._config.inputSelector);
        this.submitButton = formElement.querySelector(this._config.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    }

    /* Добавляет обработчики всем формам и полям */
    _setEventListeners() {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this.inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                const isFormValid = this.formElement.checkValidity();

                this._checkInputValidity(inputElement);
                this.toggleButtonState(isFormValid);
            })
        })
    }

    /* Найти элемент ошибки */
    _findErrorElement(inputElement) {
        return this.formElement.querySelector(`.${inputElement.id}-error`);
    }

    /* Показать ошибку */
    _showError(inputElement, errorElement) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._config.inputErrorClass);
    }

    /* Скрыть ошибку */
    _hideError(inputElement, errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    clearInputsErrors() {
        this.inputList.forEach(inputElement => {
            this._hideError(inputElement, this._findErrorElement(inputElement), this._config);
        })
    }

    /* Проверка инпутов на валидность */
    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
            this._showError(inputElement, this._findErrorElement(inputElement));
        } else {
            this._hideError(inputElement, this._findErrorElement(inputElement));
        }
    }

    /* Активировать/деактивировать кнопку */
    toggleButtonState(isActive) {
        if (isActive) {
            this.submitButton.classList.remove(this._config.inactiveButtonClass);
            this.submitButton.disabled = false;
        } else {
            this.submitButton.classList.add(this._config.inactiveButtonClass);
            this.submitButton.disabled = true;
        }
    }
}
