import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Telegram, Whatsapp, Instagram } from "react-bootstrap-icons";

const Footer = ({ token }) => {
    return <footer>
        <div className="footer__cell">
            <Logo />
            <div className="footer__cop">©{new Date().getFullYear()}</div>
        </div>
        {token && <div className="footer__cell">
            <Link to="/catalog">Каталог</Link>
            <Link to="/">Избранное</Link>
            <Link to="/">Корзина</Link>
        </div>}
        <div className="footer__cell">
            <Link to="">Акции</Link>
            <Link to="">Новости</Link>
            <Link to="">Отзывы</Link>
        </div>
        <div className="footer__contacts">
            <h4>Мы на связи</h4>
            <p>8 (999) 00-00-00</p>
            <p>dogfood.ru@gmail.com</p>
            <div className="header__menu">
                <span className="transition"><Link to=""><Telegram /></Link></span>
                <span className="transition"><Link to=""><Whatsapp /></Link></span>
                <span className="transition"><Link to=""><Instagram /></Link></span>
            </div>
        </div>
    </footer>
}

export default Footer;