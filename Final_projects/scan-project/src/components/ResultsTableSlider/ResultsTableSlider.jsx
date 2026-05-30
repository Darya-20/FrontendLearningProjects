import React, { useState, useEffect, useRef } from 'react';
import './ResultsTableSlider.css';

import arrow from './../../images/arrow.svg';

const ResultsTableSlider = ({ histogramData }) => {
    const processHistogramData = data => {
        const totalDocs = data.find(
            item => item.histogramType === 'totalDocuments'
        );
        const riskFactors = data.find(
            item => item.histogramType === 'riskFactors'
        );

        const dateMap = new Map();

        if (totalDocs) {
            totalDocs.data.forEach(item => {
                const dateKey = new Date(item.date).toLocaleDateString(
                    'ru-RU',
                    {
                        year: 'numeric',
                        month: '2-digit',
                    }
                );
                dateMap.set(dateKey, { total: item.value, risks: 0 });
            });
        }

        if (riskFactors) {
            riskFactors.data.forEach(item => {
                const dateKey = new Date(item.date).toLocaleDateString(
                    'ru-RU',
                    {
                        year: 'numeric',
                        month: '2-digit',
                    }
                );

                if (dateMap.has(dateKey)) {
                    dateMap.get(dateKey).risks = item.value;
                } else {
                    dateMap.set(dateKey, { total: 0, risks: item.value });
                }
            });
        }

        return Array.from(dateMap.entries()).map(([date, values]) => ({
            period: date,
            total: values.total,
            risks: values.risks,
        }));
    };

    const data = histogramData ? processHistogramData(histogramData.data) : [];
    const totalCount = data.reduce((sum, item) => sum + item.total, 0);

    const [isWideScreen, setIsWideScreen] = useState(
        typeof window !== 'undefined' ? window.innerWidth > 400 : false
    );
    const [containerWidth, setContainerWidth] = useState(0);
    const columnWidth = 137;
    const gap = 2;
    const sliderContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 400);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const updateContainerWidth = () => {
            if (sliderContainerRef.current) {
                setContainerWidth(sliderContainerRef.current.offsetWidth);
            }
        };

        if (isWideScreen) {
            updateContainerWidth();
            window.addEventListener('resize', updateContainerWidth);
        }

        return () => {
            window.removeEventListener('resize', updateContainerWidth);
        };
    }, [isWideScreen]);

    const calculateSlidesPerView = () => {
        if (!containerWidth) return 5;

        const availableWidth =
            containerWidth -
            gap * (Math.floor(containerWidth / (columnWidth + gap)) - 1);
        return Math.max(1, Math.floor(availableWidth / columnWidth));
    };

    const slidesPerView = isWideScreen ? calculateSlidesPerView() : 1;
    const [currentSlide, setCurrentSlide] = useState(0);
    const maxSlides = Math.ceil(data.length / slidesPerView);

    const goToSlide = index => {
        if (index >= 0 && index < maxSlides) {
            setCurrentSlide(index);
        }
    };

    const goToNext = () => goToSlide(currentSlide + 1);
    const goToPrev = () => goToSlide(currentSlide - 1);

    const getCurrentSlideData = () => {
        const startIndex = currentSlide * slidesPerView;
        return data.slice(startIndex, startIndex + slidesPerView);
    };

    if (!data.length) {
        return <div>Нет данных для отображения</div>;
    }

    return (
        <section id="results">
            <h2 className="page-subtitle">Общая сводка</h2>
            <p className="results__text">
                Найдено {totalCount.toLocaleString('ru-RU')} вариантов
            </p>

            <div className="results__slider">
                <div
                    className={`prev ${currentSlide === 0 ? 'disabled' : ''}`}
                    onClick={goToPrev}
                >
                    <img src={arrow} alt="" className="arrow rotate-180" />
                </div>

                <div ref={sliderContainerRef} className="results__table">
                    <table
                        className={`slider-table ${isWideScreen ? 'desktop-view' : 'mobile-view'}`}
                    >
                        <thead>
                            <tr>
                                <th>Период</th>
                                <th>Всего</th>
                                <th>Риски</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getCurrentSlideData().map((row, index) => (
                                <tr key={index}>
                                    <td>{row.period}</td>
                                    <td>{row.total}</td>
                                    <td>{row.risks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div
                    className={`next ${currentSlide >= maxSlides - 1 ? 'disabled' : ''}`}
                    onClick={goToNext}
                >
                    <img src={arrow} alt="" className="arrow" />
                </div>
            </div>
        </section>
    );
};

export default ResultsTableSlider;
