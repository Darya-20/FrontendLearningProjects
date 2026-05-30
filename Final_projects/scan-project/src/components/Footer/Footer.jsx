import React from 'react';
import './Footer.css';
import logoFooter from './logo_footer.svg';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer__logo">
                <img src={logoFooter} alt="logo" className="logo_image" />
            </div>
            <div className="footer__info">
                <div className="footer__contacts">
                    г. Москва, Цветной б-р, 40
                    <br />
                    +7 495 771 21 11
                    <br />
                    info@skan.ru
                </div>
                <p className="footer__copyright">Copyright. 2022</p>
            </div>
        </div>
    </footer>
);

export default Footer;
