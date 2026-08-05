/**
 * ==========================================================
 * MAX MiniApp Launcher
 * config.js
 * Version: 0.1.0
 * ==========================================================
 */

'use strict';

const CONFIG = Object.freeze({

    /**
     * Информация о приложении
     */
    APP: Object.freeze({

        NAME: 'MAX MiniApp Launcher',

        VERSION: '0.1.0',

        DESCRIPTION: 'Launcher for OAuth2 authorization service'

    }),

    OAUTH: Object.freeze({

    LOGIN_URL: 'https://lk-app.bsomsk.ru/applications/lk-client/api/appmax/login'

    }),

    /**
     * Режим разработки
     */
    DEBUG: true,

    /**
     * Показывать сообщения Logger.debug()
     */
    LOG_LEVEL: 'debug',

    /**
     * Таймаут ожидания инициализации MAX Bridge (мс)
     */
    INIT_TIMEOUT: 5000,

    /**
     * URL второго приложения.
     * Позже будет заменен на URL OAuth2-сервиса.
     */
    TARGET: Object.freeze({

        URL: 'https://example.com',

        USER_ID_PARAMETER: 'userId'

    }),

    /**
     * Пользователь для режима DEBUG
     */
    DEBUG_USER: Object.freeze({

        id: 10000001,

        first_name: 'Debug',

        last_name: 'User',

        username: 'debug',

        language_code: 'ru'

    }),

    /**
     * Настройки интерфейса
     */
    UI: Object.freeze({

        SHOW_VERSION: true,

        ENABLE_ANIMATION: true,

        SHOW_DEBUG_BADGE: true

    }),

    /**
     * Названия классов CSS
     */
    CSS: Object.freeze({

        HIDDEN: 'hidden',

        LOADING: 'status--loading',

        SUCCESS: 'status--success',

        ERROR: 'status--error'

    }),

    /**
     * Текстовые сообщения
     */
    TEXT: Object.freeze({

        INITIALIZING: 'Инициализация приложения...',

        WAITING_MAX: 'Ожидание MAX Bridge...',

        READY: 'Приложение готово.',

        DEBUG_MODE: 'Работа в режиме DEBUG.',

        MAX_MODE: 'Подключено к MAX.',

        USER_NOT_FOUND: 'Информация о пользователе отсутствует.',

        UNKNOWN_ERROR: 'Неизвестная ошибка.'

    })

});
