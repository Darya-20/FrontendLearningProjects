import React, { useState, useEffect } from 'react';
import { AccountAPI } from '../../api/apiService';
import './Header.css';
import loader from './images/loader.svg';

const AuthUserPanel = ({ mobile = false }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await AccountAPI.getAccountInfo();
                setUserData(response.data.eventFiltersInfo);
            } catch (error) {
                console.error('Ошибка загрузки данных пользователя:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="header__limit">
                <img src={loader} alt="Загрузка" className="limit__loader" />
            </div>
        );
    }

    return (
        <div className="header__limit auth-user">
            <div className="limit__text">Использовано компаний</div>
            <div className="limit__used">{userData?.usedCompanyCount}</div>
            <div className="limit__text">Лимит по компаниям</div>
            <div className="limit__total">{userData?.companyLimit}</div>
        </div>
    );
};

export default AuthUserPanel;
