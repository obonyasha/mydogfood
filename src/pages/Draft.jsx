import { useState } from "react";
import Searh from "../components/Search";
import Promo from "../components/Promo/Promo";
import Card from "../components/Card";
import cardsData from "../assets/data";

const sizes = ["sm", "lg", "md"];
const adds = [];

let text = "Полёты собак в космос — серия, включавших проведение исследований по возможности полётов на геофизических и космических ракетах живых существ, наблюдение за поведением животных в условиях таких полётов, а также, изучение сложных явлений в пространстве"
text = text.match(/[^\s,.]+/g);

let rand = (n) => Math.floor(Math.random() * n);

let n = 8;
while (n--) {
    adds.push({
        text: `${text[rand(text.length)].slice(0, 8)} ${text[rand(text.length)].slice(0, 8)} ${text[rand(text.length)].slice(0, 8)}`,
        pic: !Math.round(Math.random()), //!!0 => false, !!1 => true
        type: sizes[rand(sizes.length)]
    })
}

const Draft = () => {
    const [goods, setGoods] = useState(cardsData);
    return (
        <div className="container">
        <Searh arr={cardsData} upd={setGoods} />
        {adds.map((el, i) => <Promo key={i} {...el} />)}
        {goods.map((el, i) => <Card
            key={i}
            img={el.pictures}
            name={el.name}
            price={el.price}
        />)}
    </div>
    )
}

export default Draft;