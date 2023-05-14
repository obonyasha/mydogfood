import Logo from "./Logo";
import Search from "../Search";
import { Link } from "react-router-dom";
import { Folder2, Star, Cart4, PersonCircle, BoxArrowInRight, ChevronRight } from "react-bootstrap-icons";

const Header = ({ user, setModalActive, serverGoods, setGoods }) => {

    const logIn = (e) => {
        e.preventDefault();
        localStorage.setItem("rockUser", "lk-band");
        setModalActive(true);
    }

    return (
        <div className="wrapper__box">
            <header>
                <div className="header__nav">
                    <Logo />
                    {user && <div className="header__search">
                        <Search arr={serverGoods} upd={setGoods} />
                    </div>}
                    <nav className="header__menu">
                        {/* Если пользователь === true */}
                        {user && <>
                            <span className="transition">
                                <Link to="/catalog" title="Каталог">
                                    <Folder2 />
                                </Link>
                            </span>
                            <span className="transition">
                                <Link to="/" title="Избранное">
                                    <Star />
                                </Link>
                            </span>
                            <span className="transition">
                                <Link to="/" title="Корзина">
                                    <Cart4 />
                                </Link>
                            </span>
                            <span className="transition">
                                <Link to="/profile" title="Профиль">
                                    <PersonCircle />
                                </Link>
                            </span>

                        </>}
                        {!user && <a href="" onClick={logIn} title="Войти">
                            <BoxArrowInRight />
                        </a>}
                    </nav>
                </div>
                <div className="header__ban">
                    <h1>Крафтовые лакомства для собак</h1>
                    <h5>Всегда свежие лакомства ручной работы с доставкой по России и Миру</h5>
                    {user &&
                        <>
                            <Link to="/catalog" title="Каталог">
                                <div className="header__catalog transition">
                                    Каталог&nbsp;
                                    <span>
                                        <ChevronRight />
                                    </span>
                                </div>
                            </Link>
                        </>
                    }
                </div>
            </header>
        </div>
    )
}


export default Header;