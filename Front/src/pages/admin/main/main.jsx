import "./main.scss";
import arrowIcon from "../../../assets/img/admin/89829-200.png";
import closeIcon from "../../../assets/img/admin/icon-close-512.png";
import { useState } from "react";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <>
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
