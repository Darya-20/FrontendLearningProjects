import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Search.css';
import document from './images/document.png';
import folders from './images/folders.png';
import man_rocket from './images/man_rocket.png';

const Search = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        inn: '',
        tonality: 'any',
        limit: '',
        startDate: '',
        endDate: '',
        maxFullness: false,
        businessContext: false,
        mainRole: false,
        riskFactorsOnly: false,
        includeMarketNews: false,
        includeAnnouncements: false,
        includeSummaries: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setIsAuthorized(false);
                    return;
                }

                const response = await fetch('/api/v1/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setIsAuthorized(response.ok);
            } catch (error) {
                console.error('Ошибка проверки авторизации:', error);
                setIsAuthorized(false);
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (authLoading) {
        return <div>Загрузка авторизации...</div>;
    }

    if (isAuthorized === false) {
        return <div>Доступ запрещён</div>;
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateInn = inn => {
        if (!inn) return 'ИНН обязателен';
        if (!/^\d{10}$/.test(inn)) return 'ИНН должен содержать 10 цифр';
        return '';
    };

    const validateDates = (startDate, endDate) => {
        if (!startDate || !endDate) return 'Необходимо указать период дат';
        if (new Date(startDate) > new Date(endDate))
            return 'Дата начала не может быть позже даты окончания';
        return '';
    };

    const validateLimit = limit => {
        if (!limit) return 'Количество документов обязательно';
        const numLimit = parseInt(limit, 10);
        if (numLimit < 1 || numLimit > 1000)
            return 'Количество документов должно быть от 1 до 1000';
        return '';
    };

    const validateForm = () => {
        const newErrors = {
            inn: validateInn(formData.inn),
            date: validateDates(formData.startDate, formData.endDate),
            limit: validateLimit(formData.limit),
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setSubmitError('');

        try {
            const searchData = prepareSearchData(formData);
            const baseUrl = 'https://gateway.scan-interfax.ru';

            const response = await fetch(
                `${baseUrl}/api/v1/objectsearch/histograms`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                    body: JSON.stringify(searchData),
                }
            );

            if (!response.ok) {
                throw new Error('Ошибка при выполнении поиска');
            }

            const result = await response.json();

            navigate('/search-results', {
                state: { searchResult: result, formData: formData },
            });
        } catch (error) {
            console.error('Ошибка поиска:', error);
            setSubmitError('Произошла ошибка при выполнении поиска.');
        } finally {
            setLoading(false);
        }
    };

    const prepareSearchData = data => {
        const formatDateForAPI = dateString => {
            if (!dateString) return null;
            const date = new Date(dateString);
            return date.toISOString();
        };

        const dataResult = {
            intervalType: 'month',
            histogramTypes: ['totalDocuments', 'riskFactors'],
            issueDateInterval: {
                startDate: formatDateForAPI(data.startDate),
                endDate: formatDateForAPI(data.endDate),
            },
            searchContext: {
                targetSearchEntitiesContext: {
                    targetSearchEntities: [
                        {
                            type: 'Company',
                            sparkId: null,
                            entityId: null,
                            inn: parseInt(data.inn, 10),
                            maxFullness: data.maxFullness,
                            inBusinessNews: data.businessContext,
                        },
                    ],
                    onlyMainRole: data.mainRole,
                    tonality: 'Any',
                    onlyWithRiskFactors: data.riskFactorsOnly,
                    riskFactors: { and: [], or: [], not: [] },
                    themes: { and: [], or: [], not: [] },
                },
                themesFilter: { and: [], or: [], not: [] },
            },
            attributeFilters: {
                excludeTechNews: !data.includeMarketNews,
                excludeAnnouncements: !data.includeAnnouncements,
                excludeDigests: !data.includeSummaries,
            },
            similarMode: 'None',
            limit: parseInt(data.limit, 10),
            sortType: 'issueDate',
            sortDirectionType: 'desc',
        };

        return dataResult;
    };

    if (isAuthorized === false) {
        return null;
    }

    return (
        <main>
            <section className="search-page">
                <h1 id="search__page-title">
                    Найдите необходимые данные в пару кликов.
                </h1>
                <p className="search__text">Задайте параметры поиска.</p>
                <p className="search__text">
                    Чем больше заполните, тем точнее поиск
                </p>

                <form id="search" onSubmit={handleSubmit}>
                    <div
                        className={`form-group input ${errors.inn ? 'error' : ''}`}
                    >
                        <label htmlFor="inn" className="form-group__name">
                            ИНН компании
                            <span className="required-field">*</span>
                        </label>
                        <input
                            id="inn"
                            name="inn"
                            type="text"
                            placeholder="10 цифр"
                            className="form-input"
                            value={formData.inn}
                            onChange={handleChange}
                        />
                        {errors.inn && (
                            <div className="error-message">{errors.inn}</div>
                        )}
                    </div>

                    <div className="form-group select">
                        <label htmlFor="tonality" className="form-group__name">
                            Тональность<span className="required-field">*</span>
                        </label>
                        <select
                            id="tonality"
                            name="tonality"
                            value={formData.tonality}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="any">Любая</option>
                            <option value="positive">Позитивная</option>
                            <option value="negative">Негативная</option>
                        </select>
                    </div>

                    <div
                        className={`form-group input ${errors.limit ? 'error' : ''}`}
                    >
                        <label htmlFor="limit" className="form-group__name">
                            Количество документов в выдаче
                            <span className="required-field">*</span>
                        </label>
                        <input
                            id="limit"
                            name="limit"
                            type="number"
                            min="1"
                            max="1000"
                            placeholder="От 1 до 1000"
                            className="form-input"
                            value={formData.limit}
                            onChange={handleChange}
                        />
                        {errors.limit && (
                            <div className="error-message">{errors.limit}</div>
                        )}
                    </div>

                    <div
                        className={`form-group date ${errors.date ? 'error' : ''}`}
                    >
                        <label className="form-group__name">
                            Даты периода
                            <span className="required-field">*</span>
                        </label>
                        <div className="date-inputs-container">
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                className="form-date"
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                className="form-date"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.date && (
                            <div className="error-message">{errors.date}</div>
                        )}
                    </div>

                    <div id="filters-checkbox">
                        <div className="form-group-checkbox">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="maxFullness"
                                    className="custom-checkbox"
                                    checked={formData.maxFullness}
                                    onChange={handleChange}
                                />
                                <span className="checkbox-text">
                                    Признак максимальной полноты
                                </span>
                            </label>
                        </div>
                        <div className="form-group-checkbox">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="businessContext"
                                    className="custom-checkbox"
                                    checked={formData.businessContext}
                                    onChange={handleChange}
                                />
                                <span className="checkbox-text">
                                    Упоминания в бизнес‑контексте
                                </span>
                            </label>
                        </div>
                        <div className="form-group-checkbox">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="mainRole"
                                    className="custom-checkbox"
                                    checked={formData.mainRole}
                                    onChange={handleChange}
                                />
                                <span className="checkbox-text">
                                    Главная роль в публикации
                                </span>
                            </label>
                        </div>
                        <div className="form-group-checkbox">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="riskFactorsOnly"
                                    className="custom-checkbox"
                                    checked={formData.riskFactorsOnly}
                                    onChange={handleChange}
                                />
                                <span className="checkbox-text">
                                    Публикации только с риск‑факторами
                                </span>
                            </label>
                        </div>
                        <div className="form-group-checkbox">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="includeMarketNews"
                                    className="custom-checkbox"
                                    checked={formData.includeMarketNews}
                                    onChange={handleChange}
                                />
                                <span className="checkbox-text">
                                    Включать технические новости рынков
                                </span>
                            </label>
                        </div>
                        <div className="form-group-checkbox">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="includeAnnouncements"
                                    className="custom-checkbox"
                                    checked={formData.includeAnnouncements}
                                    onChange={handleChange}
                                />
                                <span className="checkbox-text">
                                    Включать анонсы и календари
                                </span>
                            </label>
                        </div>
                        <div className="form-group-checkbox">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="includeSummaries"
                                    className="custom-checkbox"
                                    checked={formData.includeSummaries}
                                    onChange={handleChange}
                                />
                                <span className="checkbox-text">
                                    Включать сводки новостей
                                </span>
                            </label>
                        </div>
                    </div>

                    {submitError && (
                        <div className="error-message general-error">
                            {submitError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        id="btn-search"
                        className={loading ? 'loading' : ''}
                    >
                        {loading ? 'Поиск...' : 'Поиск'}
                    </button>

                    <p className="note">* Обязательные к заполнению поля</p>
                </form>
            </section>

            <img src={document} alt="document" id="main__image-document" />
            <img src={folders} alt="folders" id="main__image-folders" />
            <img
                src={man_rocket}
                alt="man_rocket"
                id="main__image-man_rocket"
            />
        </main>
    );
};

export default Search;
