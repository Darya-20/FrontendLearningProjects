import React, { useState } from 'react';
import './Tariffs.css';
import tariff_beginner from './images/tariff_beginner.png';
import tariff_pro from './images/tariff_pro.png';
import tariff_business from './images/tariff_business.png';

const Tariffs = () => {
    const tariffs = [
        {
            title: 'Beginner',
            subtitle: 'Для небольшого исследования',
            image: tariff_beginner,
            priceDiscount: 799,
            priceTotal: 1200,
            instalment: 'или 150 ₽/мес. при рассрочке на 24 мес.',
            services: [
                'Безлимитная история запросов',
                'Безопасная сделка',
                'Поддержка 24/7',
            ],
            color: '#000000',
            backgroundColor: '#FFB64F',
            isCurrent: true,
        },
        {
            title: 'Pro',
            subtitle: 'Для HR и фрилансеров',
            image: tariff_pro,
            priceDiscount: 1299,
            priceTotal: 2600,
            instalment: 'или 279 ₽/мес. при рассрочке на 24 мес.',
            services: [
                'Все пункты тарифа Beginner',
                'Экспорт истории',
                'Рекомендации по приоритетам',
            ],
            color: '#000000',
            backgroundColor: '#7CE3E1',
            isCurrent: false,
        },
        {
            title: 'Business',
            subtitle: 'Для корпоративных клиентов',
            image: tariff_business,
            priceDiscount: 2379,
            priceTotal: 3700,
            instalment: '',
            services: [
                'Все пункты тарифа Pro',
                'Безлимитное количество запросов',
                'Приоритетная поддержка',
            ],
            color: '#FFFFFF',
            backgroundColor: '#000000',
            isCurrent: false,
        },
    ];

    return (
        <section className="tariffs">
            <h2 className="page-subtitle">наши тарифы</h2>

            <div className="tariff-cards">
                {tariffs.map((tariff, index) => (
                    <div
                        key={index}
                        className={`tariff-card ${tariff.isCurrent ? 'current' : ''}`}
                        style={{
                            '--tariff-border-color': tariff.backgroundColor,
                        }}
                    >
                        <div
                            className="tariff__name"
                            style={{
                                backgroundColor: tariff.backgroundColor,
                                color: tariff.color,
                            }}
                        >
                            <p className="tariff__title">{tariff.title}</p>
                            <p className="tariff__subtitle">
                                {tariff.subtitle}
                            </p>
                            <img
                                src={tariff.image}
                                alt={`${tariff.title}_${index}`}
                                className="tariff__image"
                            />
                        </div>

                        <div className="tariff__description">
                            {tariff.isCurrent && (
                                <div id="tariff-current">Текущий тариф</div>
                            )}
                            <div className="tariff__price-block">
                                <div className="price-discount">
                                    {tariff.priceDiscount} ₽
                                </div>
                                <div className="price-total">
                                    {tariff.priceTotal} ₽
                                </div>
                            </div>
                            <div className="tariff__price-instalment">
                                {tariff.instalment}
                            </div>
                            <div className="tariff__services">
                                <p className="services">В тариф входит:</p>
                                <ul className="services-list">
                                    {tariff.services.map((service, sIndex) => (
                                        <li key={sIndex} className="service">
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {tariff.isCurrent ? (
                                <button className="btn-detailed current">
                                    Перейти в личный кабинет
                                </button>
                            ) : (
                                <button className="btn-detailed">
                                    Подробнее
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tariffs;
