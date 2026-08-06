/**
 * ==========================================================
 * MAX MiniApp Launcher
 * max-api.js
 * Version: 0.2.0
 * ==========================================================
 */

'use strict';

class MaxApi {

    #webApp = null;
    #initialized = false;
    #debug = false;
    #user = null;

    /**
     * Инициализация MAX Bridge
     */
    async initialize() {

        Logger.info("Initializing MAX Bridge...");

        if (typeof window.WebApp === "undefined") {

            Logger.warn("MAX Bridge not found. DEBUG mode enabled.");

            this.#debug = true;
            this.#initialized = true;
            this.#user = CONFIG.DEBUG_USER;

            return;
        }

        this.#webApp = window.WebApp;

        try {

            if (typeof this.#webApp.ready === "function") {
                this.#webApp.ready();
            }

            this.#user = this.#readUser();

            this.#initialized = true;

            Logger.info("MAX Bridge initialized.");

        }
        catch (error) {

            Logger.exception(error);

            this.#debug = true;
            this.#initialized = true;
            this.#user = CONFIG.DEBUG_USER;

        }

    }

    /**
     * Получение пользователя
     */
    #readUser() {

        const user = this.#webApp?.initDataUnsafe?.user ?? null;

        if (!user) {

            Logger.warn("User not available.");

            return null;

        }

        Logger.debug("User:", user);

        return user;

    }

    isInitialized() {
        return this.#initialized;
    }

    isAvailable() {
        return this.#webApp !== null;
    }

    isDebug() {
        return this.#debug;
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
     * Получение authorizationCode
     */
    async requestAuthorizationCode() {

        Logger.info("Request authorizationCode...");

        const url = Utils.createUrl(

            "https://lk-app.bsomsk.ru/applications/lk-client/api/appmax/login",

            {
                maxUserId: this.getUserId(),
                maxUserName: this.getUserName()
            }

        );

        Logger.debug("GET " + url);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const result = await response.json();

        Logger.debug("OAuth response:", result);

        if (!result.code) {

            throw new Error(
                "Authorization code not received."
            );

        }

        if (result.code.length !== 32) {

            throw new Error(
                "Invalid authorization code."
            );

        }

        return result;

    }

    /**
     * Запуск личного кабинета
     */
    async launch() {

        const auth =
            await this.requestAuthorizationCode();

        const url = Utils.createUrl(

            "https://lk-app.bsomsk.ru/applications/lk-client",

            {
                code: auth.code
            }

        );
window.location.href = url;
        Logger.info("Open:", url);

        if (
            this.#webApp &&
            typeof this.#webApp.openLink === "function"
        ) {

            this.#webApp.openLink(url);

            if (
                typeof this.#webApp.close === "function"
            ) {

                setTimeout(() => {

                    this.#webApp.close();

                }, 300);

            }

            return;

        }

        window.location.href = url;

    }

    /**
     * Версия клиента
     */
    getVersion() {

        return this.#webApp?.version ?? "";

    }

    /**
     * Платформа
     */
    getPlatform() {

        return this.#webApp?.platform ?? "";

    }

    /**
     * Цветовая схема
     */
    getColorScheme() {

        return this.#webApp?.colorScheme ?? "light";

    }

    /**
     * Параметры темы
     */
    getThemeParams() {

        return this.#webApp?.themeParams ?? {};

    }

}
