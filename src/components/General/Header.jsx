import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Folder2, Star, Cart4, PersonCircle, BoxArrowInRight } from "react-bootstrap-icons";

const Header = ({ user, setModalActive }) => {

    const logIn = (e) => {
        e.preventDefault();
        // setUser("lk-band");
        localStorage.setItem("rockUser", "lk-band");
        // setUser("lk-band");
        // localStorage.setItem("rockUser", "lk-band");
        setModalActive(true);
    }
    return <header>
        <Logo />
        <div className="search"></div>
        <nav className="header__menu">
            {/* Если пользователь === true */}
            {user && <>
                <Link to="/catalog" title="Каталог">
                    <Folder2 />
                </Link>
                <Link to="/" title="Избранное">
                    <Star />
                </Link>
                <Link to="/" title="Корзина">
                    <Cart4 />
                </Link>
                <Link to="/profile" title="Профиль">
                    <PersonCircle />
                </Link>
            </>}
            {!user && <a href="" onClick={logIn} title="Войти">
                <BoxArrowInRight />
            </a>}
        </nav>
    </header>
}


export default Header;