import Promo from "../components/Promo";
import Card from "../components/Card";
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';



const Main = ({ goodsNew, token }) => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    return (
        <div className="main__wrapper maxwidth">
            <p className="promo_big">
                <Promo />
            </p>
            {token && <div className="carousel maxwidth">
                <h4>Новинки</h4>
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={2}
                    gutter={20}
                    leftChevron={<button>{'<'}</button>}
                    rightChevron={<button>{'>'}</button>}
                    outsideChevron
                    chevronWidth={chevronWidth}
                >
                    {goodsNew.map(g => <Card
                        key={g._id}
                        {...g}
                        img={g.pictures}
                    />)}
                </ItemsCarousel>
            </div>}
            <div className="promo__container">
                <p><Promo /></p>
                <p><Promo /></p>
            </div>
            <div className="promo_big promo_none">
                <Promo />
            </div>
            <div className="promo_big promo_none">
                <Promo />
            </div>
        </div>
    )
}

export default Main;