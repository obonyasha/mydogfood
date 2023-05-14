import Card from "../components/Card";

const Catalog = ({ goods }) => {
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