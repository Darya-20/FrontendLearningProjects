import React from 'react';
import './Header.css';

const UnauthUserPanel = ({ onLoginClick }) => (
    <div className="unauth-user">
        <a href="#" className="unauth-user__registration btn-registration">
            Зарегистрироваться
        </a>
        <div id="unauth-user__separator"></div>
        <button className="unauth-user__login btn-login" onClick={onLoginClick}>
            Войти
        </button>
    </div>
);

export default UnauthUserPanel;
