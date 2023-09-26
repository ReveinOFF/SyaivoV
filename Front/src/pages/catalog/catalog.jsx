import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./catalogStyle.scss";

import clothing from "../../assets/img/catalog/3531744.png";
import gloves from "../../assets/img/catalog/1031506.png";
import boots from "../../assets/img/catalog/8061753.png";
import protect from "../../assets/img/catalog/436643.png";
import hozTovari from "../../assets/img/catalog/6345665.png";
import arrowBlack from "../../assets/img/catalog/7456364.png";
import arrowWhite from "../../assets/img/catalog/745643364.png";

const Catalog = () => {
  useEffect(() => {
    document.title = "Каталог";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/size">Розміри</NavLink>
      </div>

      <div className="catalogs">
        <h1>Каталог</h1>

        <div className="categories">
          <div className="category">
            <h2>Спецодяг</h2>
            <img src={clothing} alt="Спецодяг" />
            <img src={arrowWhite} alt="arrow" />
          </div>
          <div className="category">
            <h2>Взуття</h2>
            <img src={boots} alt="Взуття" />
            <img src={arrowBlack} alt="arrow" />
          </div>
          <div className="category">
            <h2>Рукавички</h2>
            <img src={gloves} alt="Рукавички" />
            <img src={arrowBlack} alt="arrow" />
          </div>
          <div className="category">
            <h2>Засоби індивідуального захисту</h2>
            <img src={protect} alt="Засоби індивідуального захисту2" />
            <img src={arrowWhite} alt="arrow" />
          </div>
          <div className="category">
            <h2>Господарські товари</h2>
            <img src={hozTovari} alt="Господарські товари" />
            <img src={arrowWhite} alt="arrow" />
          </div>
        </div>

        <button>
          <Link to="/products?section=all">Переглянути всі товари</Link>
        </button>
      </div>
    </>
  );
};

export default Catalog;
