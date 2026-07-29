/**
 * ==========================================================
 * MAX MiniApp Launcher
 * ui.js
 * Version: 0.1.0
 * ==========================================================
 */

'use strict';

class UI {

    constructor() {

        this.elements = {

            statusPanel: document.getElementById('statusPanel'),
            statusText: document.getElementById('statusText'),

            userCard: document.getElementById('userCard'),
            userName: document.getElementById('userName'),
            userId: document.getElementById('userId'),
            userInitials: document.getElementById('userInitials'),

            launchButton: document.getElementById('launchButton'),

            errorPanel: document.getElementById('errorPanel'),
            errorText: document.getElementById('errorText'),

            environment: document.getElementById('environment'),
            appVersion: document.getElementById('appVersion')

        };

        this.initialize();

    }

    initialize() {

        this.elements.appVersion.textContent = CONFIG.APP.VERSION;

        this.setEnvironment(
            CONFIG.DEBUG ? 'DEBUG' : 'MAX'
        );

        this.setStatus(CONFIG.TEXT.INITIALIZING);

        this.hideUser();

        this.hideError();

        this.disableLaunch();

    }

    /**
     * Статус приложения
     */
    setStatus(text) {

        this.elements.statusText.textContent = text;

    }

    /**
     * Режим работы
     */
    setEnvironment(value) {

        this.elements.environment.textContent = value;

    }

    /**
     * Пользователь
     */
    showUser(user) {

        this.elements.userName.textContent =
            Utils.getFullName(user);

        this.elements.userId.textContent =
            user.id ?? '—';

        this.elements.userInitials.textContent =
            Utils.getInitials(user);

        this.elements.userCard.classList.remove(
            CONFIG.CSS.HIDDEN
        );

    }

    hideUser() {

        this.elements.userCard.classList.add(
            CONFIG.CSS.HIDDEN
        );

    }

    /**
     * Ошибка
     */
    showError(message) {

        this.elements.errorText.textContent = message;

        this.elements.errorPanel.classList.remove(
            CONFIG.CSS.HIDDEN
        );

    }

    hideError() {

        this.elements.errorPanel.classList.add(
            CONFIG.CSS.HIDDEN
        );

    }

    /**
     * Кнопка запуска
     */
    enableLaunch(callback) {

        this.elements.launchButton.disabled = false;

        this.elements.launchButton.onclick = callback;

    }

    disableLaunch() {

        this.elements.launchButton.disabled = true;

        this.elements.launchButton.onclick = null;

    }

    /**
     * DEBUG
     */
    setDebugMode() {

        this.setEnvironment('DEBUG');

    }

    /**
     * MAX
     */
    setMaxMode() {

        this.setEnvironment('MAX');

    }

    /**
     * Полный сброс интерфейса
     */
    reset() {

        this.hideUser();

        this.hideError();

        this.disableLaunch();

        this.setStatus(CONFIG.TEXT.INITIALIZING);

    }

}
