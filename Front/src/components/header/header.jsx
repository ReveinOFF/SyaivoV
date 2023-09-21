import { Link, NavLink } from "react-router-dom";
import "./headerStyles.scss";
import callIcon from "../../assets/img/header/phone.png";
import maskIcon from "../../assets/img/header/473477.png";
import bootsIcon from "../../assets/img/header/11311695.png";
import meansIcon from "../../assets/img/header/hoztovari.png";
import glovesIcon from "../../assets/img/header/2209715.png";
import jacketIcon from "../../assets/img/header/l_4405a1a75be769531c64c7c5e66c7735.png";
import avatarIcon from "../../assets/img/avatar.svg";

const Header = () => {
  return (
    <header>
      <div className="h-top container">
        <nav className="h-t-left">
          <NavLink to="/">
            <img src={avatarIcon} alt="avatar" loading="lazy" />
            <div>СЯЙВО-В</div>
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
            <Link to="tel:+380677336594">(067) 733-65-94</Link>
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
            <div className="h-catalog-modal">
              <Link>
                <img src={glovesIcon} alt="gloves" />
                <div>Рукавиці</div>
              </Link>
              <hr />
              <Link>
                <img src={jacketIcon} alt="jacket" />
                <div>Спецодяг</div>
              </Link>
              <hr />
              <Link>
                <img src={bootsIcon} alt="boots" />
                <div>Спецвзуття</div>
              </Link>
              <hr />
              <Link>
                <img src={meansIcon} alt="means" />
                <div>Господарчі товари</div>
              </Link>
              <hr />
              <Link>
                <img src={maskIcon} alt="mask" />
                <div>Засоби індивідуального захисту</div>
              </Link>
            </div>
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
