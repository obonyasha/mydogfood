import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ChevronLeft, Plus, Dash, HeartFill, Heart, Truck, Check2Circle } from "react-bootstrap-icons";
import CtxLike from "../contextLike";

import Loader from "../components/Loader";

const Product = () => {
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(0);
    const { id } = useParams();
    const { isLike, updLike } = useContext(CtxLike);
    const navigate = useNavigate();

    const clickCountUp = () => {
        setCount(count + 1);
    }

    const clickCountDoWn = () => {
        if (count > 0) {
            setCount(count - 1);
        }

    }

    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("rockToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setProduct(data);
                }
            })
    }, []);

    return (
        <div className="wrapper__product maxwidth">
            <button className="btn__gray" onClick={() => navigate(-1)}><ChevronLeft />&nbsp;Назад</button>
            {product.name
                ?
                <div className="product">
                    <div className="product__block">
                        <div className="product__block_left">
                            <h2>{product.name}</h2>
                            <p><img src={product.pictures} alt={product.name} className="product__img" /></p>
                        </div>
                        <div className="product__block_rigth">
                            <span className="product__price">
                                {product.discount > 0
                                    ? <>
                                        <del>{product.price}&nbsp;₽</del>
                                        <span className="font__bold">{product.price * (100 - product.discount) / 100}&nbsp;₽</span>
                                    </>
                                    : <>{product.price}&nbsp;₽</>
                                }
                                {/* &nbsp;₽ */}
                            </span>
                            <div className="product__block">
                                <div className="product__add">
                                    <button className="product__btn" onClick={clickCountDoWn}><Dash /></button>
                                    <span className="font__bold">{count}</span>
                                    <button className="product__btn" onClick={clickCountUp}><Plus /></button>
                                </div>
                                <button className="pay__btn transition font__bold">В корзину</button>
                            </div>
                            <button className="btn__gray" onClick={updLike}>
                                {isLike ? <HeartFill /> : <Heart />}&nbsp;В избранное
                            </button>
                            <div className="product__block product__block_team-gray">
                                <span className="font__gray"><Truck /></span>
                                <div className="product__block_rigth">
                                    <h4>Доставка по всему миру!</h4>
                                    <p>Доставка курьером &mdash; <span className="font__bold">от 399&nbsp;₽</span></p>
                                    <p>Доставка в пункт выдачи &mdash; <span className="font__bold">от 199&nbsp;₽</span></p>
                                </div>
                            </div>
                            <div className="product__block product__block_team-gray">
                                <span className="font__gray"><Check2Circle /></span>
                                <div className="product__block_rigth">
                                    <h4>Гарантия качества</h4>
                                    <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить Ваши нужды.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="product__block_left">
                        <h3>Описание</h3>
                        <p>{product.description}</p>
                    </div>
                    <div className="product__block_left">
                        <h3>Характеристики</h3>
                        <div className="product__char">
                            <div className="product__char_row">
                                <span>Вес</span>
                            </div>
                            <p>{product.wight}</p>
                        </div>
                    </div>
                    <div className="product__block_left">
                        <h3>Отзывы</h3>
                        <button className="product__add-reviews font__bold transition">Написать отзыв</button>
                        {(product.reviews.length > 0) ?
                            product.reviews.map(el =>
                                <>
                                    <h4>{el.author.name}</h4>
                                    <p>{el.text}</p>
                                    <hr />
                                </>
                            )
                            :
                            <p>Пока здесь нет отзывов</p>
                        }

                    </div>
                </div>
                : <Loader />
            }
        </div>
    )
}
export default Product;