import { Link, NavLink } from "react-router-dom";
import "./productStyle.scss";
import image from "../../assets/img/temp/_________________64d0e4243704d.jpg";
import React, { useState } from "react";

const Product = () => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [typeDescription, setTypeDescription] = useState(1);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  const description =
    "fghdfg hdfghdfghdh\ndgfhgfhfhdfghdf ghfhfdgdfhdf fghdfghdhdfgh dfhdfghdf hdfghdfh\n fgh dfghdfghdfg hdh dghf hdfghdfghdfghdfghdf\ndfghdfghdf dfgdhfthdfthd thtdhthdfth tfhdthdhfghtdrhbfcftb\ndfhgfhdfgdfgs";
  const characteristics =
    "fgh dfghdfj ftyhsd 5rgersdg rthfgbdfrtghtdr h\n drtyhdrtghthtdyrthgdrthfy hythdrft\n szd464565y 6y56645";

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/products">Список товарів</Link>
        <div>/</div>
        <Link to="/products/"></Link>
        <div>/</div>
        <NavLink to=""></NavLink>
      </div>

      <div className="product-information">
        <div class="img-magnifier-container">
          <img
            id="myimage"
            src={image}
            width="600"
            height="400"
            alt="Girl"
            onMouseEnter={(e) => {
              setShowMagnifier(true);

              const elem = e.currentTarget;
              const { width, height } = elem.getBoundingClientRect();
              setSize([width, height]);
              setShowMagnifier(true);
            }}
            onMouseLeave={() => {
              setShowMagnifier(false);
            }}
            onMouseMove={(e) => {
              const elem = e.currentTarget;
              const { top, left } = elem.getBoundingClientRect();

              const x = e.pageX - left - window.pageXOffset;
              const y = e.pageY - top - window.pageYOffset;
              setXY([x, y]);
            }}
          />

          <div
            className="img-magnifier-glass"
            style={{
              display: showMagnifier ? "" : "none",
              top: `${y - 150 / 2}px`,
              left: `${x - 150 / 2}px`,
              backgroundImage: `url('${image}')`,
              backgroundSize: `${imgWidth * 1.5}px ${imgHeight * 1.5}px`,
              backgroundPositionX: `${-x * 1.5 + 200 / 2}px`,
              backgroundPositionY: `${-y * 1.5 + 150 / 2}px`,
            }}
          ></div>
        </div>

        <div className="info">
          <h1>Кепка Lider, TM Floyd, чорна</h1>
          <div>&#x2022; 66&#8372;</div>
          <button>Актуальну ціну, просимо уточнювати у менеджера</button>
          <hr />
          <div>
            <span>Категорії: </span>
            <Link to="">Спецодяг</Link>
            {" - "}
            <Link to="">Головні убори</Link>
          </div>
        </div>
      </div>

      <div className="product-description">
        <div>
          <button
            className={typeDescription === 1 && "active"}
            onClick={() => setTypeDescription(1)}
          >
            Опис товару
          </button>
          <button
            className={typeDescription === 2 && "active"}
            onClick={() => setTypeDescription(2)}
          >
            Характеристики
          </button>
        </div>
        <hr />
        {typeDescription === 2 ? (
          <div>
            {characteristics.split(/\n/g).map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  {item}
                  <br />
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div>
            {description.split(/\n/g).map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  {item}
                  <br />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
