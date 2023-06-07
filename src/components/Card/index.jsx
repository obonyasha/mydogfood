import { useState, useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Heart, HeartFill, Percent } from "react-bootstrap-icons";
import Ctx from "../../context";

const Card = ({ img, name, price, _id, discount, wight, tags, likes }) => {
    const { setServerGoods, api, setBasket, basket } = useContext(Ctx);
    const [isLike, setIsLike] = useState(likes.includes(localStorage.getItem("rockId")));
    const [inBasket, setInBasket] = useState(basket.filter(el => el.id === _id).length > 0);

    const addToBasket = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInBasket(true);
        setBasket(prev => [...prev, {
            id: _id,
            cnt: 1,
            name: name,
            img: img,
            price: price,
            discount: discount,
            wight: wight
        }])
    }

    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);
        // fetch(`https://api.react-learning.ru/products/likes/${_id}`, {
        //     method: isLike ? "DELETE" : "PUT",
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        api.setLike(_id, !isLike)
            .then(data => {
                console.log(data);
                setServerGoods(function (old) {
                    const arr = old.map(el => {
                        if (el._id === _id) {
                            return data;
                        } else {
                            return el
                        }
                    });
                    return arr;
                })
            })
    }

    return (
            <Link className="card" to={`/product/${_id}`}>
                {discount > 0 && <span className="card__discount"><Percent />{discount}</span>}
                <span className="card__like" onClick={updLike}>
                    {isLike ? <HeartFill /> : <Heart />}
                </span>
                <img src={img} alt="Картинка" className="card__img" />
                <span className="card__name">{name}</span>
                <span className="card__price">
                    {discount > 0
                        ? <>
                            <del>{price}</del>
                            &nbsp;
                            {price * (100 - discount) / 100}
                        </>
                        : price
                    }
                    &nbsp;₽
                </span>
                <button className="pay__btn card__btn transition"
                    onClick={addToBasket}
                    disabled ={inBasket}
                >{inBasket ? "В корзине" : "В корзину"}</button>
                {/* <span className="card__tags">
                {tags.map(el => <span key={el}>{el}</span>)}
            </span> */}
            </Link>
    )
}

export default Card;