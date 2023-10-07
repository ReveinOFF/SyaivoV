import { Link, useNavigate, useParams } from "react-router-dom";
import "./productStyle.scss";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LazyContext } from "../../components/lazy-context/lazy-contex";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [typeDescription, setTypeDescription] = useState(1);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  const setLoading = useContext(LazyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const GetProduct = async () => {
      setLoading(true);

      await axios
        .get(`${process.env.REACT_APP_SERVER_API}/api/product/${id}`)
        .then((res) => {
          if (res.status === 200) setProduct(res.data);
          else navigate("/error");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    GetProduct();
  }, [id]);

  useEffect(() => {
    document.title = product ? product.name : "Продукт";
  }, [product]);

  const handleDelete = async () => {
    setLoading(true);

    await axios
      .delete(`${process.env.REACT_APP_SERVER_API}/api/product/${id}`)
      .then((res) => {
        if (res.status === 200) navigate("/products");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/products">Список товарів</Link>
        {product && (
          <>
            <div>/</div>
            <Link to={`/products/${product.catalog_key_name}`}>
              {product.catalog_name}
            </Link>
            {product.subcatalog_name && (
              <>
                <div>/</div>
                <Link
                  to={`/products/${product.catalog_key_name}?type=${product.subcatalog_id}`}
                >
                  {product.subcatalog_name}
                </Link>
              </>
            )}
          </>
        )}
      </div>

      <div className="product-information">
        <div class="img-magnifier-container">
          {product && (
            <>
              <img
                id="myimage"
                src={`${process.env.REACT_APP_SERVER_API}/static/${product.image}`}
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
                  backgroundImage: `url('${process.env.REACT_APP_SERVER_API}/static/${product.image}')`,
                  backgroundSize: `${imgWidth * 1.5}px ${imgHeight * 1.5}px`,
                  backgroundPositionX: `${-x * 1.5 + 200 / 2}px`,
                  backgroundPositionY: `${-y * 1.5 + 150 / 2}px`,
                }}
              ></div>
            </>
          )}
        </div>

        <div className="info">
          <h1>{product ? product.name : "Загрузка..."}</h1>
          <div>&#x2022; {product ? product.price : "Загрузка..."}</div>
          <button>Актуальну ціну, просимо уточнювати у менеджера</button>
          <hr />
          <div>
            <span>Категорії: </span>
            {product && (
              <>
                <Link to={`/products/${product.catalog_key_name}`}>
                  {product.catalog_name}
                </Link>
                {product.subcatalog_name && (
                  <>
                    {" - "}
                    <Link
                      to={`/products/${product.catalog_key_name}?type=${product.subcatalog_id}`}
                    >
                      {product.subcatalog_name}
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
          {localStorage.getItem("token") && (
            <button onClick={handleDelete}>Видалити</button>
          )}
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
            {product && (
              <>
                {product.size && (
                  <h4>
                    Розмір: <span>{product.size}</span>
                  </h4>
                )}

                {product.color && (
                  <h4>
                    Колір: <span>{product.color}</span>
                  </h4>
                )}

                {product.fabric && (
                  <h4>
                    Тканина: <span>{product.fabric}</span>
                  </h4>
                )}

                {product.fabric_warehouse && (
                  <h4>
                    Склад тканин: <span>{product.fabric_warehouse}</span>
                  </h4>
                )}

                {product.material && (
                  <h4>
                    Матеріал: <span>{product.material}</span>
                  </h4>
                )}
              </>
            )}
          </div>
        ) : (
          <div>
            {product &&
              product.description.split(/\n/g).map((item, idx) => {
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
