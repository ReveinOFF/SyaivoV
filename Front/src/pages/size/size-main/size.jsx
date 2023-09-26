import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./sizeStyles.scss";
import clothing from "../../../assets/img/size/19.jpg";
import boots from "../../../assets/img/size/56а.jpg";
import wave from "../../../assets/img/size/Orange-Wave-Transparent-Images-PNG.png";

import Intersection from "../../../components/intersection/intersection";

const Size = () => {
  useEffect(() => {
    document.title = "Вибір розмірів";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/size">Розміри</NavLink>
      </div>

      <div className="sellect-size-b">
        <Intersection>
          <Link to="clothing" className="clothing-block hiddenLeft">
            <div className="img">
              <img
                draggable="false"
                src={clothing}
                loading="lazy"
                alt="clothing"
              />
            </div>
            <div className="cl-inf-block">
              <div>
                Тут ви знайдете інформацію про розміри спецодягу, такого як
                куртки, брюки, фартухи та інший спецодяг.
              </div>
              <div>
                При натисканні на цю вкладку вас перенаправлять на сторінку із
                зручною таблицею розмірів та додатковою інформацією про вибір та
                підбір спецодягу.
              </div>
            </div>
            <img
              draggable="false"
              src={wave}
              alt="wave"
              className="wave"
              style={{ scale: "-1" }}
            />
          </Link>

          <Link to="boots" className="boots-block hiddenRight">
            <div className="bs-inf-block">
              <div>
                Тут ви знайдете інформацію про розміри взуття, такого як
                черевики, кросівки, чоботи та інше.
              </div>
              <div>
                При натисканні на цю вкладку вас перекине на сторінку із зручною
                таблицею розмірів для взуття та корисними порадами для
                правильного вибору.
              </div>
            </div>
            <div className="img">
              <img draggable="false" src={boots} loading="lazy" alt="boots" />
            </div>
            <img draggable="false" src={wave} alt="wave" className="wave" />
          </Link>
        </Intersection>
      </div>
    </>
  );
};

export default Size;
