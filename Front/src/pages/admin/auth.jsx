import "./authStyle.scss";
import arrowIcon from "../../assets/img/admin/89829-200.png";
import closeIcon from "../../assets/img/admin/icon-close-512.png";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LazyContext } from "../../components/lazy-context/lazy-contex";
import axios from "axios";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalErr, setShowModalErr] = useState(false);
  const setLoading = useContext(LazyContext);
  const navigate = useNavigate();
  const loginRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    document.title = "Авторизація";
  }, []);

  const handleClick = async () => {
    if (
      loginRef.current.value.length === 0 ||
      passRef.current.value.length === 0
    )
      return;

    setLoading(true);

    await axios
      .post(`${process.env.REACT_APP_SERVER_API}/api/auth`, {
        login: loginRef.current.value,
        password: passRef.current.value,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          setShowModal(!showModal);
        } else {
          setShowModalErr(!showModalErr);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/admin">Адмін меню</NavLink>
      </div>

      {showModalErr && (
        <div className="auth-modal">
          <div>
            <img
              draggable="false"
              src={closeIcon}
              alt="close"
              onClick={() => {
                setShowModalErr(!showModalErr);
              }}
            />
            <div>Помилка! Логін або пароль не вірний.</div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="auth-modal">
          <div>
            <img
              draggable="false"
              src={closeIcon}
              alt="close"
              onClick={() => {
                setShowModal(!showModal);
                navigate("/");
              }}
            />
            <div>
              Ви успішно авторизувалися! Після того, як ви закриєте це вікно,
              вас перенаправлять на головну сторінку.
            </div>
          </div>
        </div>
      )}

      <div className="auth-block">
        <div>
          Якщо ви бажаєте увійти на сайт як адміністратор, то вам потрібно
          ввести дані та натиснути кнопку "Увійти".
        </div>
        <img draggable="false" src={arrowIcon} alt="arrow" />
        <input ref={loginRef} type="text" placeholder="Логін" />
        <input ref={passRef} type="password" placeholder="Пароль" />
        <button onClick={handleClick}>Увійти</button>
      </div>
    </>
  );
};

export default Main;
