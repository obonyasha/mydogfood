import { useState, useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Heart, HeartFill, Percent } from "react-bootstrap-icons";
import Ctx from "../../context";
import CtxLike from "../../contextLike";

const Card = ({ img, name, price, _id, discount, tags, likes }) => {
    const { token, setServerGoods } = useContext(Ctx);
    const [isLike, setIsLike] = useState(likes.includes(localStorage.getItem("rockId")));

    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);
        fetch(`https://api.react-learning.ru/products/likes/${_id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
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
        <CtxLike.Provider value={{
            isLike,
            updLike
        }}>
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
                <button className="pay__btn transition">В корзину</button>
                {/* <span className="card__tags">
                {tags.map(el => <span key={el}>{el}</span>)}
            </span> */}
            </Link>
        </CtxLike.Provider>

    )
}

export default Card;