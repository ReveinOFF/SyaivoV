import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./catalogStyle.scss";

import clothing from "../../assets/img/catalog/3531744.png";
import gloves from "../../assets/img/catalog/1031506.png";
import boots from "../../assets/img/catalog/8061753.png";
import protect from "../../assets/img/catalog/436643.png";
import hozTovari from "../../assets/img/catalog/6345665.png";
import embroidery from "../../assets/img/catalog/4851485709_w640_h2048_free_icon_embroidery_3461238.png";
import arrowBlack from "../../assets/img/catalog/7456364.png";
import arrowWhite from "../../assets/img/catalog/745643364.png";

import Intersection from "../../components/intersection/intersection";

const Catalog = () => {
  useEffect(() => {
    document.title = "Каталог";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/catalog">Каталог</NavLink>
      </div>

      <div className="catalogs">
        <Intersection>
          <h1 className="hidden">Каталог</h1>

          <div className="categories">
            <Link to="/catalog/clothing" className="category hiddenRight">
              <div>
                <h2>Спецодяг</h2>
                <img src={clothing} alt="Спецодяг" />
                <img src={arrowWhite} alt="arrow" />
              </div>
            </Link>
            <Link to="/catalog/boots" className="category hiddenRight">
              <div>
                <h2>Взуття</h2>
                <img src={boots} alt="Взуття" />
                <img src={arrowBlack} alt="arrow" />
              </div>
            </Link>
            <Link to="/catalog/gloves" className="category hiddenRight">
              <div>
                <h2>Рукавички</h2>
                <img src={gloves} alt="Рукавички" />
                <img src={arrowBlack} alt="arrow" />
              </div>
            </Link>
            <Link to="/catalog/protected" className="category hiddenLeft">
              <div>
                <h2>Засоби індивідуального захисту</h2>
                <img src={protect} alt="Засоби індивідуального захисту" />
                <img src={arrowWhite} alt="arrow" />
              </div>
            </Link>
            <Link to="/products/embroidery" className="category hiddenLeft">
              <div>
                <h2>Комп'ютерна вишивка</h2>
                <img src={embroidery} alt="Комп'ютерна вишивка" />
                <img src={arrowWhite} alt="arrow" />
              </div>
            </Link>
            <Link to="/catalog/household" className="category hiddenRight">
              <div>
                <h2>Господарські товари</h2>
                <img src={hozTovari} alt="Господарські товари" />
                <img src={arrowWhite} alt="arrow" />
              </div>
            </Link>
          </div>

          <Link to="/products">
            <button className="hiddenBottom">
              <div>Переглянути всі товари</div>
            </button>
          </Link>
        </Intersection>
      </div>
    </>
  );
};

export default Catalog;
