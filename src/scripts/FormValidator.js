export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = formElement.querySelectorAll(this._config.inputSelector);
        this._submitButton = formElement.querySelector(this._config.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    }

    /* Добавляет обработчики всем формам и полям */
    _setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            })
        })
    }

    /* Найти элемент ошибки */
    _findErrorElement(inputElement) {
        return this._formElement.querySelector(`.${inputElement.id}-error`);
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
        this._inputList.forEach(inputElement => {
            this._hideError(inputElement, this._findErrorElement(inputElement));
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
    toggleButtonState() {
        const isFormValid = this._formElement.checkValidity();

        if (isFormValid) {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }
}
