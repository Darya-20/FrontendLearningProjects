import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import './AdvantagesSlider.css';
import './../../styles/style.css';

import arrow from './../../images/arrow.svg';
import time_speed_icon from './images/time_speed_icon.svg';
import search_database_icon from './images/search_database_icon.svg';
import security_icon from './images/security_icon.svg';

const AdvantagesSlider = () => {
    const sliderRef = useRef(null);

    const slides = [
        {
            id: 1,
            image: time_speed_icon,
            text: 'Высокая и оперативная скорость обработки заявки',
        },
        {
            id: 2,
            image: search_database_icon,
            text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
        },
        {
            id: 3,
            image: security_icon,
            text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className="advantages-block">
            <h2 className="page-subtitle">Почему именно мы</h2>
            <div className="advantages">
                <button
                    className="prev"
                    onClick={() => sliderRef.current?.slickPrev()}
                >
                    <img src={arrow} alt="arrow" className="arrow rotate-180" />
                </button>

                <Slider ref={sliderRef} {...settings}>
                    {slides.map(slide => (
                        <div key={slide.id} className="advantage">
                            <img
                                src={slide.image}
                                alt=""
                                className="advantage__image"
                            />
                            <p className="advantage__text">{slide.text}</p>
                        </div>
                    ))}
                </Slider>

                <button
                    className="next"
                    onClick={() => sliderRef.current?.slickNext()}
                >
                    <img src={arrow} alt="arrow" className="arrow" />
                </button>
            </div>
        </section>
    );
};

export default AdvantagesSlider;
