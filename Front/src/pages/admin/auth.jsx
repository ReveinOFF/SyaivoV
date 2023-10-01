import "./authStyle.scss";
import arrowIcon from "../../assets/img/admin/89829-200.png";
import closeIcon from "../../assets/img/admin/icon-close-512.png";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LazyContext } from "../../components/lazy-context/lazy-contex";
import axios from "axios";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const setLoading = useContext(LazyContext);

  useEffect(() => {
    document.title = "Авторизація";
  }, []);

  const handleClick = async () => {
    setLoading(true);

    await axios
      .post(`${process.env.REACT_APP_SERVER_API}/api/auth/send`)
      .then((res) => {
        if (res.status === 200) setShowModal(!showModal);
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

      {showModal && (
        <div className="auth-modal">
          <div>
            <img
              draggable="false"
              src={closeIcon}
              alt="close"
              onClick={() => setShowModal(!showModal)}
            />
            <div>
              Вам було надіслано листа на пошту з посиланням, яке авторизує вас
              як адміністратора.
            </div>
          </div>
        </div>
      )}

      <div className="auth-block">
        <div>
          Якщо ви бажаєте увійти на сайт як адміністратор, то вам потрібно
          натиснути кнопку "Увійти".
        </div>
        <img draggable="false" src={arrowIcon} alt="arrow" />
        <button onClick={handleClick}>Увійти</button>
      </div>
    </>
  );
};

export default Main;
