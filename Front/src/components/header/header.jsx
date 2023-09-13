import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import callIcon from "../../assets/img/phone.png";
import avatarIcon from "../../assets/img/avatar.png";

const Header = () => {
  return (
    <header>
      <div className="h-top container">
        <nav className="h-t-left">
          <NavLink to="/">
            <img src={avatarIcon} alt="avatar" />
            <div>Сяйво-В</div>
          </NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/size">Розміри</NavLink>
          <NavLink to="/company">Компанія</NavLink>
          <NavLink to="/contact">Контакти</NavLink>
        </nav>
        <div className="h-t-right">
          <img src={callIcon} alt="phone" />
          <div className="h-contact">
            <Link to="tel:+380963282889">(096) 328-28-89</Link>
            <Link to="tel:+380362629808">(036) 262-98-08</Link>
          </div>
        </div>
      </div>
      <div className="h-bottom">
        <div className="container">
          <div className="h-catalog">
            <button>
              <div>&#9776;</div>
              <div>Каталог товарів</div>
            </button>
            <div className="h-catalog-modal"></div>
          </div>
          <div className="h-search">
            <input type="text" placeholder="Пошук товара" />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 15 15"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M14.177 7.176A6.588 6.588 0 101 7.176a6.588 6.588 0 0013.177 0zm-11.942 0a5.353 5.353 0 1110.706 0 5.353 5.353 0 01-10.706 0z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#fff"
                  d="M11.156 11.517a.618.618 0 01.805-.053l.069.06 2.587 2.631a.618.618 0 01-.812.927l-.07-.06-2.586-2.632a.618.618 0 01.007-.873z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
