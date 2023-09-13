import "./footer.scss";
import { Link } from "react-router-dom";
import mailIcon from "../../assets/img/mail_footer.png";
import callIconFooter from "../../assets/img/phone_footer.png";
import geo_point from "../../assets/img/gps_point.png";

const Footer = () => {
  return (
    <footer>
      <div className="container f-top">
        <div className="f-info"></div>
        <div className="f-pages">
          <Link to="/">Головна</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/size">Розміри</Link>
          <Link to="/company">Компанія</Link>
          <Link to="/contact">Контакти</Link>
        </div>
        <div className="f-contact">
          <div className="phone">
            <img src={callIconFooter} alt="call" />
            <div>
              <div>(096) 328-28-89</div>
              <div>
                <Link to="tel:+380963282889">(096) 328-28-89</Link>
                <hr />
                <Link to="tel:+380362629808">(036) 262-98-08</Link>
                <hr />
                <Link to="tel:+380677336594">(067) 733-65-94</Link>
                <hr />
                <Link to="tel:+380503219592">(050) 321-95-92</Link>
              </div>
            </div>
          </div>
          <div className="mail">
            <img src={mailIcon} alt="mail" />
            <Link to="mailto:ppsyaivo-v@ukr.net">ppsyaivo-v@ukr.net</Link>
          </div>
          <div className="geo_point">
            <img src={geo_point} alt="geolocation" />
            <div>м. Рівне, Рівненська обл., вул. Відінська, 39б.</div>
          </div>
          <button>
            <div>&#127760;</div>
            <Link to="https://goo.gl/maps/xQsmmbz55W9QEn5B6" target="_blank">
              Відкрити карту
            </Link>
          </button>
        </div>
      </div>
      <hr />
      <div className="container f-bottom">
        Сяйво-В {new Date().getFullYear()} © <span>Всі права захищені</span>
      </div>
    </footer>
  );
};

export default Footer;
