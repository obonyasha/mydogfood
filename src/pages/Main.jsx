import Promo2 from "../components/Promo2";
import Card from "../components/Card";
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';



const Main = ({ goods, token }) => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    return (
        <>
            <div className="promo_big">
                <Promo2 />
            </div>
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
                    {goods.filter(el => el.tags.includes("new")).map(g => <Card
                        key={g._id}
                        {...g}
                        img={g.pictures}
                    />)}
                </ItemsCarousel>
            </div>}
            <div className="promo__container">
                <Promo2 />
                <Promo2 />
            </div>
            {/* {goods.map(g => <Card
                key={g._id}
                {...g}
                img={g.pictures}
            />)} */}
        </>
    )
}

export default Main;