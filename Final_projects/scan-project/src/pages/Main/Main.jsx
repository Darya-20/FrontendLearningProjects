import React, { useState } from 'react';

import './Main.css';
import AdvantagesSlider from './../../components/AdvantagesSlider/AdvantagesSlider';
import Tariffs from './../../components/Tariffs/Tariffs';

import man_chart from './images/man_chart.png';
import man_sitting from './images/man_sitting.png';

const Main = () => {
    const isAuthenticated = !!localStorage.getItem('authToken');

    const handleSearchClick = () => {
        window.location.href = '/search';
    };

    return (
        <main className="main__main">
            <section id="hero">
                <h1 id="page-title">
                    Сервис по поиску публикаций о компании по его ИНН
                </h1>
                <p className="hero__text">
                    Комплексный анализ публикаций, получение данных в формате
                    PDF на электронную почту.
                </p>
                {isAuthenticated && (
                    <button id="request-data" onClick={handleSearchClick}>
                        Запросить данные
                    </button>
                )}

                <img src={man_chart} alt="man chart" className="hero__image" />
            </section>

            <AdvantagesSlider />

            <img src={man_sitting} alt="man sitting" id="main__image" />
            <Tariffs />
        </main>
    );
};

export default Main;
