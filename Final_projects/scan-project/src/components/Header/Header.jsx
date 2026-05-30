import React, { useState } from 'react';
import AuthUserPanel from './AuthUserPanel';
import UnauthUserPanel from './UnauthUserPanel';
import LimitUser from './LimitUser';
import './Header.css';

import logo from './images/logo.svg';
import logo_white from './images/logo_white.svg';
import burger_menu_open from './images/burger_menu_open.svg';
import burger_menu_close from './images/burger_menu_close.svg';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isAuthenticated = !!localStorage.getItem('authToken');

    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__logo">
                        <img src={logo} alt="logo" className="logo_image" />
                    </div>

                    <nav className="header__nav">
                        <a href="/">Главная</a>
                        <a href="#">Тарифы</a>
                        <a href="#">FAQ</a>
                    </nav>

                    {isAuthenticated && <LimitUser />}
                    {isAuthenticated && <AuthUserPanel />}
                    {!isAuthenticated && (
                        <UnauthUserPanel onLoginClick={handleLoginClick} />
                    )}
                </div>
            </header>

            <header
                className={`header__version_mobile ${isMobileMenuOpen ? 'open' : ''}`}
            >
                <div className="container">
                    <div className="header__logo">
                        <img
                            src={isMobileMenuOpen ? logo_white : logo}
                            alt="logo"
                            className="logo_image"
                        />
                    </div>

                    {isAuthenticated && <LimitUser />}

                    <button
                        className="header__burger-menu"
                        onClick={toggleMobileMenu}
                    >
                        <img
                            src={burger_menu_open}
                            alt=""
                            className={`burger-menu_open ${isMobileMenuOpen ? 'hidden' : ''}`}
                        />
                        <img
                            src={burger_menu_close}
                            alt=""
                            className={`burger-menu_close ${isMobileMenuOpen ? '' : 'hidden'}`}
                        />
                    </button>

                    <nav
                        className={`header__nav__version_mobile_open ${isMobileMenuOpen ? 'open' : ''}`}
                    >
                        <div className="nav__links">
                            <a href="/">Главная</a>
                            <a href="#">Тарифы</a>
                            <a href="#">FAQ</a>
                        </div>
                        {isAuthenticated ? (
                            <AuthUserPanel mobile={true} />
                        ) : (
                            <div className="unauth-user_mobile">
                                <a
                                    href="#"
                                    className="unauth-user__registration btn-registration"
                                >
                                    Зарегистрироваться
                                </a>
                                <button
                                    className="unauth-user__login btn-login"
                                    onClick={handleLoginClick}
                                >
                                    Войти
                                </button>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
