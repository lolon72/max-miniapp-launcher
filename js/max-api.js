/**
 * ==========================================================
 * MAX MiniApp Launcher
 * max-api.js
 * Version: 0.1.0
 * ==========================================================
 */

'use strict';

class MaxApi {

    #webApp = null;
    #initialized = false;
    #debugMode = false;
    #user = null;

    /**
     * Инициализация API
     */
    async initialize() {

        Logger.info('Initializing MAX Bridge...');

        if (typeof window.WebApp === 'undefined') {

            Logger.warn('MAX Bridge not found. DEBUG mode enabled.');

            this.#debugMode = true;
            this.#user = CONFIG.DEBUG_USER;
            this.#initialized = true;

            return;

        }

        this.#webApp = window.WebApp;

        try {

            if (typeof this.#webApp.ready === 'function') {
                this.#webApp.ready();
            }

            this.#user = this.#extractUser();

            this.#initialized = true;

            Logger.info('MAX Bridge initialized.');

        }
        catch (error) {

            Logger.exception(error);

            this.#debugMode = true;
            this.#user = CONFIG.DEBUG_USER;
            this.#initialized = true;

        }

    }

    /**
     * Получить пользователя
     */
    #extractUser() {

        const initData = this.#webApp?.initDataUnsafe;

        if (!initData) {

            Logger.warn('initDataUnsafe is empty.');

            return null;

        }

        if (!initData.user) {

            Logger.warn('User not found.');

            return null;

        }

        Logger.debug('User:', initData.user);

        return initData.user;

    }

    /**
     * API доступен
     */
    isAvailable() {

        return this.#webApp !== null;

    }

    /**
     * Приложение инициализировано
     */
    isInitialized() {

        return this.#initialized;

    }

    /**
     * Режим DEBUG
     */
    isDebug() {

        return this.#debugMode;

    }

    /**
     * Пользователь
     */
    getUser() {

        return this.#user;

    }

    /**
     * user.id
     */
    getUserId() {

        return this.#user?.id ?? null;

    }

    /**
     * Полное имя
     */
    getUserName() {

        return Utils.getFullName(this.#user);

    }

    /**
     * Язык пользователя
     */
    getLanguage() {

        return this.#user?.language_code ?? 'ru';

    }

    /**
     * Открыть ссылку
     */
    openLink(url) {

        Logger.info('Open link:', url);

        if (!url) {

            Logger.error('URL is empty.');

            return;

        }

        if (
            this.#webApp &&
            typeof this.#webApp.openLink === 'function'
        ) {

            this.#webApp.openLink(url);

            return;

        }

        window.open(url, '_blank');

    }

    /**
     * Построить URL запуска
     */
    buildLaunchUrl() {

        return Utils.createUrl(

            CONFIG.TARGET.URL,

            {
                [CONFIG.TARGET.USER_ID_PARAMETER]: this.getUserId()
            }

        );

    }

    /**
     * Запуск второго приложения
     */
    launch() {

        const url = this.buildLaunchUrl();

        this.openLink(url);

    }

    /**
     * Версия платформы MAX
     */
    getVersion() {

        return this.#webApp?.version ?? null;

    }

    /**
     * Цветовая схема
     */
    getColorScheme() {

        return this.#webApp?.colorScheme ?? 'light';

    }

    /**
     * Тема
     */
    getThemeParams() {

        return this.#webApp?.themeParams ?? {};

    }

    /**
     * Закрыть MiniApp
     */
    close() {

        if (
            this.#webApp &&
            typeof this.#webApp.close === 'function'
        ) {

            this.#webApp.close();

        }

    }

}
