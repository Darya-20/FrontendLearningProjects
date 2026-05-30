import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import ResultsTableSlider from './../../components/ResultsTableSlider/ResultsTableSlider';
import Documents from './../../components/Documents/Documents';

import woman_darts from './woman_darts.png';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [histogramData, setHistogramData] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState('');

    const searchResult = location.state?.searchResult;
    const data = location.state?.formData;

    useEffect(() => {
        if (!searchResult) {
            navigate('/search');
            return;
        }

        initializeResults();
    }, [searchResult, navigate]);

    const initializeResults = async () => {
        try {
            setHistogramData(searchResult);
        } catch (err) {
            console.error('Ошибка инициализации результатов:', err);
            setError('Произошла ошибка при загрузке результатов поиска');
        } finally {
            setPageLoading(false);
        }
    };

    const prepareSearchParams = () => {
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

    if (pageLoading) {
        return (
            <div className="results-page loading">
                <h1>Загрузка результатов поиска...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="results-page error">
                <h1>Ошибка</h1>
                <p>{error}</p>
                <button onClick={() => navigate('/search')} className="btn">
                    Вернуться к поиску
                </button>
            </div>
        );
    }

    return (
        <main>
            <h1 id="results__page-title">
                Ищем. Скоро
                <br />
                будут результаты
            </h1>
            <p className="text">
                Поиск может занять некоторое время,
                <br />
                просим сохранять терпение.
            </p>
            <img src={woman_darts} alt="woman_darts" id="woman-darts" />
            <ResultsTableSlider histogramData={histogramData} />
            <Documents
                searchParams={prepareSearchParams()}
                loading={pageLoading}
            />
        </main>
    );
};

export default SearchResults;
