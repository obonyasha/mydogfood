import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ChevronLeft, Plus, Dash, HeartFill, Heart, Truck, Check2Circle } from "react-bootstrap-icons";
import Ctx from "../context";

import Loader from "../components/Loader";

const Product = () => {
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    const [modalRevActive, setModalRevActive] = useState(false);
    const { id } = useParams();
    const { userId, setServerGoods, api } = useContext(Ctx);
    const navigate = useNavigate();

    const clickCountUp = () => {
        setCount(count + 1);
    }

    const clickCountDoWn = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const clearForm = () => {
        setText("");
    }

    useEffect(() => {
        // fetch(`https://api.react-learning.ru/products/${id}`, {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        api.getSingleProduct(id)
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setProduct(data);
                }
            })
    }, []);

    const sendForm = (e) => {
        e.preventDefault();
        let body = {
            text: text
        }
        // fetch(`https://api.react-learning.ru/products/review/${id}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     },
        //     body: JSON.stringify(body)
        // })
        //     .then(res => res.json())
        api.addReview(id, body)
            .then(data => {
                setProduct(data);
            })
        clearForm();
        setModalRevActive(false);
    }

    const deleteRev = (idRev) => {
        // fetch(`https://api.react-learning.ru/products/review/${product._id}/${idRev}`, {
        //     method: "DELETE",
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        api.delReview(id, idRev)
            .then(data => {
                setProduct(data);
            })
    }

    const delProduct = () => {
        // fetch("https://api.react-learning.ru/products/${id}", {
        //     method: "DELETE",
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        api.delProduct(id)
            .then(data => {
                setServerGoods(prev => prev.filter(el => el._id !== id));
                navigate("/catalog")
            })
    }

    return (
        <div className="wrapper__product maxwidth"
        >
            <button className="btn__gray" onClick={() => navigate(-1)}><ChevronLeft />&nbsp;Назад</button>
            {product.name
                ?
                <div className="product">
                    <div className="product__block">
                        <div className="product__block_left">
                            <h2>{product.name}</h2>
                            <p><img src={product.pictures} alt={product.name} className="product__img" /></p>
                        </div>
                        <div className="block__rigth">
                            <span className="product__price">
                                {product.discount > 0
                                    ? <>
                                        <del>{product.price}&nbsp;₽</del>
                                        <span className="font__bold">{product.price * (100 - product.discount) / 100}&nbsp;₽</span>
                                    </>
                                    : <p className="font__bold">{product.price}&nbsp;₽</p>
                                }
                            </span>
                            <div className="product__block">
                                <div className="product__add">
                                    <button className="product__btn" onClick={clickCountDoWn}><Dash /></button>
                                    <span className="font__bold">{count}</span>
                                    <button className="product__btn" onClick={clickCountUp}><Plus /></button>
                                </div>
                                <button className="pay__btn transition font__bold pay__btn_mobile">В корзину</button>
                            </div>
                            <button className="btn__gray">
                                <HeartFill /> &nbsp;В избранное
                            </button>
                            <div className="product__block product__block_team-gray product__block_none">
                                <span className="font__gray"><Truck /></span>
                                <div className="product__block_rigth">
                                    <h5>Доставка по всему миру!</h5>
                                    <p>Доставка курьером &mdash; <span className="font__bold">от 399&nbsp;₽</span></p>
                                    <p>Доставка в пункт выдачи &mdash; <span className="font__bold">от 199&nbsp;₽</span></p>
                                </div>
                            </div>
                            <div className="product__block product__block_team-gray product__block_none">
                                <span className="font__gray"><Check2Circle /></span>
                                <div className="product__block_rigth">
                                    <h5>Гарантия качества</h5>
                                    <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить Ваши нужды.</p>
                                </div>
                            </div>
                            {userId === product.author._id &&
                                <button className="product__add product__delete transition"
                                    onClick={delProduct}
                                >Удалить товар</button>}

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
                    <div className="product__block product__block_team-gray product__block_flex">
                        <span className="font__gray"><Truck /></span>
                        <div className="product__block_rigth">
                            <h4>Доставка по всему миру!</h4>
                            <p>Доставка курьером &mdash; <span className="font__bold">от 399&nbsp;₽</span></p>
                            <p>Доставка в пункт выдачи &mdash; <span className="font__bold">от 199&nbsp;₽</span></p>
                        </div>
                    </div>
                    <div className="product__block product__block_team-gray product__block_flex">
                        <span className="font__gray"><Check2Circle /></span>
                        <div className="product__block_rigth">
                            <h4>Гарантия качества</h4>
                            <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить Ваши нужды.</p>
                        </div>
                    </div>
                    <div className="product__block_left">
                        <h3>Отзывы</h3>
                        <button className="product__add-reviews font__bold transition"
                            onClick={() => setModalRevActive(true)}>Написать отзыв</button>
                        {(product.reviews.length > 0) ?
                            product.reviews.map((el, i) =>
                                <div className="product__block_left" key={i}>
                                    <h4>{el.author.name}</h4>
                                    <p>{el.text}</p>
                                    {el.author._id === userId &&
                                        <div>
                                            <button className="modal-link maxwidth_btn" onClick={() => deleteRev(el._id)}>Удалить отзыв</button>
                                        </div>
                                    }
                                    <hr />
                                </div>
                            )
                            :
                            <p>Пока здесь нет отзывов</p>
                        }
                    </div>
                </div>
                : <Loader />
            }
            <div className="modal__reviews"
                style={{ display: modalRevActive ? "flex" : "none" }}>
                <div className="reviews">
                    <button className="btn_close transition"
                        onClick={() => setModalRevActive(false)}>х</button>
                    <div className="reviews__product">
                        <p><img src={product.pictures} alt={product.name} className="reviews__img" /></p>
                        <div className="reviews__name">{product.name} </div>
                    </div>
                    <form onSubmit={sendForm}>
                        <label>
                            <h3>Ваш отзыв</h3>
                            <textarea
                                placeholder="Введите текст"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </label>
                        <button className="modal-link maxwidth_btn">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Product;