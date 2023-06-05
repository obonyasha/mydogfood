import { Trash3, Dash, Plus, Truck } from "react-bootstrap-icons";
import { useState, useContext } from "react";

import Ctx from "../context";


const Basket = () => {
    const { goods, setServerGoods, userId } = useContext(Ctx);
    const [count, setCount] = useState(0);

    const clickCountUp = () => {
        setCount(count + 1);
    }

    const clickCountDoWn = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }
    return (
        <div className="wrapper__product">
            <h1>
                0 товаров в корзине
            </h1>
            <div className="product__block">
                <div className="product__block_left">
                    <div className="busket__block">
                        <div className="reviews__img"></div>
                        <div>
                            <p>Назване проодукта</p>
                            <p className="btn__grey">Вес</p>
                        </div>
                        <div className="product__add">
                            <button className="product__btn" onClick={clickCountDoWn}><Dash /></button>
                            <span className="font__bold">{count}</span>
                            <button className="product__btn" onClick={clickCountUp}><Plus /></button>
                        </div>
                        {/* <span className="product__price">
                    {product.discount > 0
                        ? <>
                            <del>{product.price}&nbsp;₽</del>
                            <span className="font__bold">{product.price * (100 - product.discount) / 100}&nbsp;₽</span>
                        </>
                        : <p className="font__bold">{product.price}&nbsp;₽</p>
                    }
                </span> */}
                        <button className="transition btn__gray"
                        ><Trash3 /></button>
                    </div>
                    <hr />
                </div>
                <div className="product">
                    <div className="product__block_rigth shadow">
                        <h4>Ваша корзина</h4>
                        <div className="busket__block">
                            <p className="btn__grey">Товары(0)</p>
                            <p>0p</p>
                        </div>
                        <div className="busket__block">
                            <p className="btn__grey">Скидка</p>
                            <p>0p</p>
                        </div>
                        <hr />
                        <div className="busket__block">
                            <p>Общая стоимость</p>
                            <p>0p</p>
                        </div>
                        <button className="pay__btn">Оформить заказ</button>
                    </div>
                    <div className="product__block product__block_team-gray product__block_none">
                        <span className="font__gray"><Truck /></span>
                        <div className="product__block_rigth">
                            <h4>Доставка по всему миру!</h4>
                            <p>Доставка курьером &mdash; <span className="font__bold">от 399&nbsp;₽</span></p>
                            <p>Доставка в пункт выдачи &mdash; <span className="font__bold">от 199&nbsp;₽</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Basket;