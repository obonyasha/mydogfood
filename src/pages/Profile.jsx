import { BoxArrowInLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, color, setUser }) => {
const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        setUser("")// setUser() => setUser(null) 
        localStorage.removeItem("rockUser");
        localStorage.removeItem("rockToken");
        localStorage.removeItem("rockId");
        navigate("/"); //При выходе из профиля отправит на главную страницу
    }

    const captionStyle = {
        fontWeight: "bold",
        color: color
    }
    return (
        <>
            <h1>Личный кабинет</h1>
            <div>
                Добро пожаловать,&nbsp;
                <span style={captionStyle}>{user}</span>
                !
            </div>
            <a href="" onClick={logOut} title="Выйти">
                <BoxArrowInLeft />
            </a>
        </>
    )
}

export default Profile;