import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Ctx from "./contecst";
// компоненты
import { Header, Footer } from "./components/General";
import Modal from "./components/Modal";
// страницы
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
    const [token, setToken] = useState(localStorage.getItem("rockToken"));
    const [modalActive, setModalActive] = useState(false);
    const [serverGoods, setServerGoods] = useState([]); // товары из базы данных сервера
    const [goods, setGoods] = useState(serverGoods); //товары для поиска и фильтрации

    useEffect(() => {
        if (user) {
            setToken(localStorage.getItem("rockToken"))
        } else {
            setToken("")
        }
    }, [user])

    // useEffect срабатывает каждый раз, когда компонент создался или перерисовался
    useEffect(() => {
        if (token) {
            fetch("https://api.react-learning.ru/products", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products);
                })
        }
    }, [token])

    useEffect(() => {
        console.log("ook")
        setGoods(serverGoods);
    }, [serverGoods])

    return (
        <Ctx.Provider value={{
            user,
            setUser,
            token,
            modalActive,
            setModalActive,
            serverGoods,
            setServerGoods,
            goods,
            setGoods
        }}>
            <Header
            />
            <main>
                {/* <Searh  /> */}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/profile" element={
                        <Profile color="blue" />
                    } />
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </main>
            <Footer />
            <Modal />
        </Ctx.Provider>
    )
}

export default App;