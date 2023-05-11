import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// компоненты
import Searh from "./components/Search";
import { Header, Footer } from "./components/General";
import Modal from "./components/Modal";
// страницы
import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
    const [token, setToken] = useState(localStorage.getItem("rockToken"));
    const [serverGoods, setServerGoods] = useState([]); // товары из базы данных сервера
    const [goods, setGoods] = useState(serverGoods); //товары для поиска и фильтрации
    const [modalActive, setModalActive] = useState(false);

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

    // useEffect(() => {
    //     console.log("Modal edit");
    // }, [modalActive])

    useEffect(() => {
        console.log("Change user");
        if (user) {
            setToken(localStorage.getItem("rockToken"))
        } else {
            setToken("")
        }
        console.log("u", user);
    }, [user])

    return (
        <>
            <Header
                user={user}
                setModalActive={setModalActive}
            />
            <main>
                <Searh arr={serverGoods} upd={setGoods} />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/catalog" element={<Catalog goods={goods}/>} />
                    <Route path="/draft" element={<Draft />} />
                    <Route path="/profile" element={
                        <Profile user={user} setUser={setUser} color="yellow" />
                    } />
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </main>
            <Footer />
            <Modal
                active={modalActive}
                setActive={setModalActive}
                setUser={setUser} />
        </>
    )
}

export default App;