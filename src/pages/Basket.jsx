import { Trash3, Dash, Plus, Truck } from "react-bootstrap-icons";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Ctx from "../context";


const Basket = () => {
    const { basket, setBasket } = useContext(Ctx);

    const sum = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price
    }, 0)
    const endSum = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price * (1 - el.discount / 100)
    }, 0)
    const sale = endSum - sum;

    const inc = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt++;
            }
            return el;
        }))
    }
    const dec = (id, cnt) => {
        if (cnt === 1) {
            setBasket(prev => prev.filter(el => el.id !== id))
        } else {
            setBasket(prev => prev.map(el => {
                if (el.id === id) {
                    el.cnt--;
                }
                return el;
            }))
        }
    }

    // const textAge = (age) => {
    //     if (age % 100 >= 5 && age % 100 <= 20) {
    //         return age + ' лет';
    //     } else {
    //         age % 100 == age % 100 % 10;
    //         if (age % 100 == 1) {
    //             return age + ' год';
    //         } else if (age % 100 >= 2 && age % 100 <= 4) {
    //             return age + ' года';
    //         } else {
    //             return age + ' лет';
    //         }
    //     }
    // }

    return (
        <div className="wrapper__product">
            <h1>
                {basket.length} товаров в корзине
            </h1>
            <div className="product__block">
                <div className="basket__block_left">
                    {basket.map(el => <div key={el.id}>
                        <div className="basket__block">
                            <div className="reviews__img">
                                <img src={el.img} alt={el.name} height="100" />
                            </div>
                            <div className="basket__name">
                                <Link to={`/product/${el.id}`}>{el.name}</Link>
                                <p className="btn__grey">{el.wight}</p>
                            </div>
                            <div className="product__add">
                                <button className="product__btn" onClick={() => dec(el.id, el.cnt)}><Dash /></button>
                                <span className="font__bold">{el.cnt}</span>
                                <button className="product__btn" onClick={() => inc(el.id)}><Plus /></button>
                            </div>
                            <span className="basket__price">
                                {el.discount > 0
                                    ? <>
                                        <del>{el.price*el.cnt}&nbsp;₽</del>
                                        <span className="font__bold">{(el.price * (100 - el.discount) / 100)*el.cnt}&nbsp;₽</span>
                                    </>
                                    : <p className="font__bold">{el.price*el.cnt}&nbsp;₽</p>
                                }
                            </span>
                            <button className="transition basket__delete"
                            ><Trash3 /></button>
                        </div>
                        <hr />
                    </div>
                    )}
                </div>
                <div className="block__rigth ">
                    <div className="product__block_rigth shadow">
                        <h4>Ваша корзина</h4>
                        <div className="basket__block">
                            <p className="btn__grey">Товары({basket.length})</p>
                            <p>{sum} ₽</p>
                        </div>
                        <div className="basket__block">
                            <p className="btn__grey">Скидка</p>
                            <span>{sale} ₽</span>
                        </div>
                        <hr />
                        <div className="basket__block">
                            <p className="font__bold">Общая стоимость</p>
                            <p className="font__bold">{endSum.toFixed(2)} ₽</p>
                        </div>
                        <button className="pay__btn">Оформить заказ</button>
                    </div>
                    <div className="product__block product__block_team-gray product__block_none">
                        <span className="font__gray"><Truck /></span>
                        <div className="product__block_rigth">
                            <h5>Доставка по всему миру!</h5>
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