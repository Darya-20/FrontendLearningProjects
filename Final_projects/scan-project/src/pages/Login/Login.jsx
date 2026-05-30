import React, { useState } from 'react';
import { AuthAPI } from '../../api/apiService';

import './Login.css';
import lock from './images/lock.png';
import people_key from './images/people_key.png';
import google_logo from './images/google_logo.svg';
import facebook_logo from './images/facebook_logo.svg';
import yandex_logo from './images/yandex_logo.svg';

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.login.trim()) {
            newErrors.login = 'Введите корректные данные';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async e => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            await AuthAPI.login(formData);
            window.location.href = '/';
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        } finally {
            setLoading(false);
        }
    };

    const showTab = tab => setActiveTab(tab);

    return (
        <main className="login__main">
            <h1 id="login__page-title">
                Для оформления подписки на тариф, необходимо авторизоваться.
            </h1>

            <div className="auth-container">
                <img src={lock} alt="lock" id="main__lock" />

                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => showTab('login')}
                    >
                        Войти
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => showTab('register')}
                    >
                        Зарегистрироваться
                    </button>
                </div>

                {activeTab === 'login' && (
                    <div id="login" className="tab-content active">
                        <form id="loginForm" onSubmit={handleLogin}>
                            <div className="login__form-group">
                                <div className="input-wrapper">
                                    <label
                                        htmlFor="login-input"
                                        className="text-input"
                                    >
                                        Логин или номер телефона:
                                    </label>
                                    <input
                                        type="text"
                                        id="login-input"
                                        className={`form-input ${errors.login ? 'error' : ''}`}
                                        name="login"
                                        value={formData.login}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.login && (
                                        <div
                                            className="error-message"
                                            id="login-error"
                                        >
                                            {errors.login}
                                        </div>
                                    )}
                                </div>

                                <div className="input-wrapper">
                                    <label
                                        htmlFor="password-input"
                                        className="text-input"
                                    >
                                        Пароль:
                                    </label>
                                    <input
                                        type="password"
                                        id="password-input"
                                        className={`form-input ${errors.password ? 'error' : ''}`}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        minLength="6"
                                    />
                                    {errors.password && (
                                        <div
                                            className="error-message"
                                            id="password-error"
                                        >
                                            Неправильный пароль
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                id="login-btn"
                                disabled={
                                    loading ||
                                    !formData.login ||
                                    !formData.password
                                }
                            >
                                {loading ? 'Вход...' : 'Войти'}
                            </button>

                            <a href="#" className="recover-password">
                                Восстановить пароль
                            </a>

                            <div className="social-auth">
                                <p className="social-auth__text">
                                    Войти через:
                                </p>
                                <div className="social-buttons">
                                    <a href="#" className="social-btn">
                                        <img
                                            src={google_logo}
                                            alt="Google"
                                            className="social-btn__image"
                                        />
                                    </a>
                                    <a href="#" className="social-btn">
                                        <img
                                            src={facebook_logo}
                                            alt="Facebook"
                                            className="social-btn__image"
                                        />
                                    </a>
                                    <a href="#" className="social-btn">
                                        <img
                                            src={yandex_logo}
                                            alt="Яндекс"
                                            className="social-btn__image"
                                        />
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 'register' && (
                    <div id="register" className="tab-content"></div>
                )}
            </div>

            <img
                src={people_key}
                alt="people with key"
                id="login__main__image"
            />
        </main>
    );
};

export default LoginPage;
