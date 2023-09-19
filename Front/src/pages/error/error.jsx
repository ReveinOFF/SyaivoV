import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./errorStyle.scss";
import warningIcon from "../../assets/img/error/symbole-d-avertissement-jaune.png";
import crossIcon from "../../assets/img/error/1544641784.svg";
import waveIcon from "../../assets/img/error/14-145581_orange-wave-orange-wave-png.png";

const Error = () => {
  useEffect(() => {
    document.title = "Помилка";
  }, []);

  return (
    <>
      <Link to="/" className="error-back">
        <button>Перейти на головну сторінку</button>
      </Link>

      <div className="error">
        <div>
          <h2>Упс...!</h2>
          <div>Сторінка не знайдена</div>
        </div>
        <h1>
          <div>4</div>
          <img src={warningIcon} alt="warning" />
          <div>4</div>
        </h1>
        <div>
          Сталась помилка в пошуку такої сторінки! Спробуйте пізніше або змінити
          сторінку на дійсну.
        </div>
      </div>

      <img src={crossIcon} alt="cross" className="cross cross-1" />
      <img src={crossIcon} alt="cross" className="cross cross-2" />
      <img src={crossIcon} alt="cross" className="cross cross-3" />
      <img src={crossIcon} alt="cross" className="cross cross-4" />
      <img src={crossIcon} alt="cross" className="cross cross-5" />
      <img src={crossIcon} alt="cross" className="cross cross-6" />

      <img src={waveIcon} alt="wave" className="wave" />
    </>
  );
};

export default Error;
