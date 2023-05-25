import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";
import { useContext } from "react";
import Ctx from "../../context";

const Banner = () => {
    const { user } = useContext(Ctx);
    return (
        <div className="wrapper__ban">
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
        </div>
    )
}

export default Banner;