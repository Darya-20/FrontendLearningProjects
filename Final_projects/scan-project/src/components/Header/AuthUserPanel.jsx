import React, { useState, useEffect } from 'react';
import { AccountAPI } from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const AuthUserPanel = ({ mobile = false }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        sessionStorage.clear();
        navigate('/login');
    };

    return mobile ? (
        <div className="auth-user_mobile">
            <button className="profile__btn-logout" onClick={handleLogout}>
                Выйти
            </button>
        </div>
    ) : (
        <div className="header__profile auth-user">
            <p className="profile__user-name">userName</p>
            <button className="profile__btn-logout" onClick={handleLogout}>
                Выйти
            </button>
            <div className="profile__user-photo">
                <img
                    src=""
                    alt="photo"
                    className="profile__user-photo__image"
                />
            </div>
        </div>
    );
};

export default AuthUserPanel;
