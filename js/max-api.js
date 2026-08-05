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
    #debug = false;
    #user = null;

    /**
     * Инициализация Bridge
     */
    async initialize() {

        Logger.info('Initializing MAX Bridge...');

        if (typeof window.WebApp === 'undefined') {

            Logger.warn('MAX Bridge is unavailable.');

            this.#debug = true;
            this.#initialized = true;
            this.#user = CONFIG.DEBUG_USER;

            return;
        }

        this.#webApp = window.WebApp;

        try {

            if (typeof this.#webApp.ready === 'function') {

                this.#webApp.ready();

            }

            this.#user = this.#readUser();

            this.#initialized = true;

            Logger.info('MAX Bridge initialized.');

        }
        catch (error) {

            Logger.exception(error);

            this.#debug = true;
            this.#initialized = true;
            this.#user = CONFIG.DEBUG_USER;

        }

    }

    /**
     * Чтение пользователя
     */
    #readUser() {

        const user =
            this.#webApp?.initDataUnsafe?.user ?? null;

        if (!user) {

            Logger.warn('User is not available.');

            return null;

        }

        Logger.debug(user);

        return user;

    }

    isInitialized() {

        return this.#initialized;

    }

    isDebug() {

        return this.#debug;

    }

    isAvailable() {

        return this.#webApp !== null;

    }

    getUser() {

        return this.#user;

    }

    getUserId() {

        return this.#user?.id ?? null;

    }

    getUserName() {

        return Utils.getFullName(this.#user);

    }

    /**
     * Формирование URL запуска
     */
    async requestAuthorizationCode() {

    Logger.info("Request authorizationCode...");

    const response = await fetch(

        CONFIG.OAUTH.LOGIN_URL,

        {
            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                maxUserId: this.getUserId(),

                maxUserName: this.getUserName()

            })

        }

    );

    if (!response.ok) {

        throw new Error("OAuth login failed.");

    }

    const code = await response.text();

    if (!code || code.length !== 32) {

        throw new Error("Invalid authorizationCode.");

    }

    return code;

}

    /**
     * Открытие приложения
     */
    async launch() {

    const code =
        await this.requestAuthorizationCode();

    const url = Utils.createUrl(

        "https://lk-app.bsomsk.ru/applications/lk-client",

        {

            code: code

        }

    );

    Logger.info("Launch:", url);

    if (

        this.#webApp &&
        typeof this.#webApp.openLink === "function"

    ) {

        this.#webApp.openLink(url);

        if (typeof this.#webApp.close === "function") {

            setTimeout(() => {

                this.#webApp.close();

            }, 300);

        }

        return;

    }

    window.open(url, "_blank");

}

    /**
     * Версия клиента
     */
    getVersion() {

        return this.#webApp?.version ?? '';

    }

    /**
     * Платформа
     */
    getPlatform() {

        return this.#webApp?.platform ?? '';

    }

    /**
     * Цветовая схема
     */
    getColorScheme() {

        return this.#webApp?.colorScheme ?? 'light';

    }

    /**
     * Параметры темы
     */
    getThemeParams() {

        return this.#webApp?.themeParams ?? {};

    }

}
