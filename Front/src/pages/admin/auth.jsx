import "./authStyle.scss";
import arrowIcon from "../../assets/img/admin/89829-200.png";
import closeIcon from "../../assets/img/admin/icon-close-512.png";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Main = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "Авторизація";
  }, []);

  const handleClick = () => {
    setShowModal(!showModal);
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
        <img src={arrowIcon} alt="arrow" />
        <button onClick={handleClick}>Увійти</button>
      </div>
    </>
  );
};

export default Main;
