export default (e, setInBasket, setBasket, _id, name, img, price, discount, wight, cntProd) => {
    e.preventDefault();
    e.stopPropagation();
    setInBasket(true);
    setBasket(prev => [...prev, {
        id: _id,
        cnt: cntProd,
        name: name,
        img: img,
        price: price,
        discount: discount,
        wight: wight
    }])
}