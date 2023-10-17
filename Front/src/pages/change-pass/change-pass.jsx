import { Link, NavLink, useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/img/admin/89829-200.png";
import closeIcon from "../../assets/img/admin/icon-close-512.png";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { LazyContext } from "../../components/lazy-context/lazy-contex";

const ChangePass = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalErr, setShowModalErr] = useState(false);
  const navigate = useNavigate();
  const setLoading = useContext(LazyContext);
  const passOldRef = useRef();
  const passNewRef = useRef();
  const passConfRef = useRef();

  useEffect(() => {
    document.title = "Зміна пароля";
  }, []);

  const handleClick = () => {
    if (passNewRef.current?.value === passConfRef.current?.value) {
      const editPass = async () => {
        setLoading(true);

        await axios
          .post(
            `${process.env.REACT_APP_SERVER_API}/api/auth/change-password`,
            {
              oldPassword: passOldRef.current.value,
              newPassword: passNewRef.current.value,
            }
          )
          .then((res) => {
            if (res.status === 201) {
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

      editPass();
    } else {
      setShowModalErr(true);
    }
  };

  return (
    <>
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
            <div>
              Помилка! Старий пароль або пароль для підтвердження не вірний.
            </div>
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
                if (localStorage.getItem("token"))
                  localStorage.removeItem("token");
                navigate("/admin");
              }}
            />
            <div>
              Ви успішно змінили пароль! Після того, як ви закриєте це вікно,
              вас перенаправлять на сторінку авторизації.
            </div>
          </div>
        </div>
      )}

      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/admin">Адмін меню</Link>
        <div>/</div>
        <NavLink to="/admin/change-pass">Зміна пароля</NavLink>
      </div>

      <div className="auth-block">
        <div>Змініть свій пароль.</div>
        <img draggable="false" src={arrowIcon} alt="arrow" />
        <input ref={passOldRef} type="password" placeholder="Старий пароль" />
        <input ref={passNewRef} type="password" placeholder="Новий пароль" />
        <input
          ref={passConfRef}
          type="password"
          placeholder="Підтвердження нового пароль"
        />
        <button onClick={handleClick}>Змінити пароль</button>
      </div>
    </>
  );
};

export default ChangePass;
