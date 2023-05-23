import { useContext } from "react";

import Card from "../components/Card";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

import Ctx from "../context";

const Catalog = () => {
    const { goods } = useContext(Ctx);
    const paginate = usePagination(goods, 20);
    return (
        <div className="container maxwidth">
            <div style={{gridColumnEnd: "span 4"}}><Pagination hk={paginate}/></div>
            {goods.map(g => <Card
                key={g._id}
                {...g}
                img={g.pictures}
            />)}
        </div>
    )
}

export default Catalog;