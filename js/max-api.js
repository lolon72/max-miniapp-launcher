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
    buildLaunchUrl() {

        return Utils.createUrl(

            'https://lk-app.bsomsk.ru/applications/lk-client',

            {

                maxUserId: this.getUserId(),

                maxUserName: this.getUserName()

            }

        );

    }

    /**
     * Открытие приложения
     */
    launch() {

        const url = this.buildLaunchUrl();

        Logger.info('Launch:', url);

        if (

            this.#webApp &&
            typeof this.#webApp.openLink === 'function'

        ) {

            this.#webApp.openLink(url);

            if (

                typeof this.#webApp.close === 'function'

            ) {

                setTimeout(() => {

                    this.#webApp.close();

                }, 300);

            }

            return;

        }

        window.open(url, '_blank');

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
