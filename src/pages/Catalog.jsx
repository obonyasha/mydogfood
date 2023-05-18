import { useContext } from "react";
import Card from "../components/Card";
import Ctx from "../contecst";

const Catalog = () => {
    const { goods } = useContext(Ctx);
    return (
        <div className="container maxwidth">
            {goods.map(g => <Card
                key={g._id}
                {...g}
                img={g.pictures}
            />)}
        </div>
    )
}

export default Catalog;