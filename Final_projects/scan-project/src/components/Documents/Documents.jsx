import React, { useState, useEffect } from 'react';
import contentParser from './ContentParser';
import './Documents.css';

const Documents = ({ searchParams, loading: initialLoading }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(initialLoading);
    const [hasMore, setHasMore] = useState(true);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [totalLoaded, setTotalLoaded] = useState(0);
    const LIMIT = 5;

    useEffect(() => {
        if (!initialLoading) {
            loadMoreDocuments();
        }
    }, [initialLoading]);

    const loadMoreDocuments = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const documentIds = await fetchDocumentIds(currentOffset, LIMIT);

            if (documentIds.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }

            const fullDocuments = await fetchDocuments(documentIds);

            setDocuments(prev => [...prev, ...fullDocuments]);
            setCurrentOffset(prev => prev + LIMIT);
            setTotalLoaded(prev => prev + documentIds.length);

            if (documentIds.length < LIMIT) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Ошибка загрузки документов:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDocumentIds = async (offset, limit) => {
        const baseUrl = 'https://gateway.scan-interfax.ru';
        const token = localStorage.getItem('authToken');

        const requestData = {
            ...searchParams,
            offset,
            limit,
        };

        try {
            const response = await fetch(`${baseUrl}/api/v1/objectsearch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) throw new Error('Ошибка получения ID документов');

            const result = await response.json();
            return result.items?.map(item => item.encodedId) || [];
        } catch (error) {
            console.error('Ошибка получения ID документов:', error);
            throw error;
        }
    };

    const fetchDocuments = async ids => {
        const baseUrl = 'https://gateway.scan-interfax.ru';
        const token = localStorage.getItem('authToken');

        const chunks = [];
        for (let i = 0; i < ids.length; i += 100) {
            chunks.push(ids.slice(i, i + 100));
        }

        const allDocuments = [];

        for (const chunk of chunks) {
            try {
                const response = await fetch(`${baseUrl}/api/v1/documents`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ids: chunk }),
                });

                if (!response.ok)
                    throw new Error('Ошибка получения документов');

                const chunkDocuments = await response.json();
                allDocuments.push(...chunkDocuments);
            } catch (error) {
                console.error('Ошибка получения чанка документов:', error);
            }
        }

        return allDocuments;
    };

    const formatDate = dateString => {
        if (!dateString) return 'Дата не указана';
        return new Date(dateString).toLocaleDateString('ru-RU');
    };

    if (initialLoading) {
        return <div className="loading">Загрузка документов...</div>;
    }

    return (
        <section id="documents">
            <h2 className="page-subtitle">Список документов</h2>

            <div className="documents__links">
                {documents.map((doc, index) => {
                    const article = doc.ok;
                    if (!article) return null;

                    const title = article.title?.text || 'Заголовок не указан';
                    const tag = article.attributes.isTechNews
                        ? 'Технические новости'
                        : article.attributes.isAnnouncement
                          ? 'Анонсы и события'
                          : article.attributes.isDigest
                            ? 'Сводки новостей'
                            : '';

                    const parsedData = contentParser(
                        article.content?.markup || ''
                    );
                    const sourceName =
                        article.source?.name || 'Источник не указан';

                    return (
                        <div key={index} className="document">
                            <span className="document__date">
                                {formatDate(article.issueDate)}
                            </span>
                            <span className="document__source">
                                {sourceName}
                            </span>
                            <div className="document__title">{title}</div>
                            <div className="document__tag">{tag}</div>
                            <img
                                src={parsedData.imageUrl}
                                alt=""
                                className="document__image"
                            />
                            <div className="document__text">
                                {parsedData.text}...
                            </div>
                            <a
                                href={article.url}
                                className="document__btn-read"
                            >
                                Читать в источнике
                            </a>
                            <div className="document__words">
                                Слов: {article.attributes.wordCount}
                            </div>
                        </div>
                    );
                })}
            </div>

            {hasMore && (
                <button
                    onClick={loadMoreDocuments}
                    disabled={loading}
                    className="btn-more"
                >
                    Показать больше
                </button>
            )}
        </section>
    );
};

export default Documents;
