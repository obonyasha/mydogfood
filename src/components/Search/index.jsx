import { useState } from "react";
import "./style.css"

const Searh = ({arr, upd}) => {
    // let text = "Corn";
    const [text, setText] = useState("");
    const [quantity, setQuantity] = useState(arr.length);

    const [count, updateCount] = useState(0);

    let n = 1;
    const click = () => {
        console.log(n++);
        updateCount(count + 1); //новое состояние
    }
    const searchByText = (event) => {
        let val = event.target.value;
        setText(val);
        // let result = arr.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
        let result = arr.filter(el => new RegExp(val, "i").test(el.name));
        upd(result);
        setQuantity(result.length);
        console.log(result);
    }
    return (
        <div className="search-block">
            <input type="search" className="search" value={text} onChange={searchByText} placeholder="Ищу тебя..." />
            <button onClick={click}>Тык</button>
            <hr />
            {/* <div>{text}, {n}, {count}</div> */}
            <div>По Вашему запросу «{text}» найдено {quantity} подходящих товаров</div>
        </div>
    )
}

export default Searh;