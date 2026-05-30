import axios from 'axios';

const BASE_URL = 'https://gateway.scan-interfax.ru';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleApiError = error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                localStorage.removeItem('authToken');
                window.location.href = '/login';
                break;
            case 403:
                return Promise.reject(new Error('Доступ запрещён'));
            case 429:
                return Promise.reject(new Error('Превышен лимит запросов'));
            default:
                return Promise.reject(
                    new Error(`Ошибка сервера: ${error.response.status}`)
                );
        }
    } else if (error.request) {
        return Promise.reject(new Error('Нет ответа от сервера'));
    } else {
        return Promise.reject(new Error(`Ошибка запроса: ${error.message}`));
    }
};

export const AuthAPI = {
    /**
     * Авторизация пользователя
     * @param {Object} credentials - { username, password }
     * @returns {Promise} - { accessToken, expire }
     */
    login: async credentials => {
        try {
            const response = await apiClient.post(
                '/api/v1/account/login',
                credentials
            );
            const { accessToken, expire } = response.data;

            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('tokenExpire', expire);

            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },
};

export const AccountAPI = {
    /**
     * Получение информации об аккаунте пользователя
     * @returns {Promise}
     */
    getAccountInfo: async () => {
        try {
            return await apiClient.get('/api/v1/account/info');
        } catch (error) {
            return handleApiError(error);
        }
    },
};
