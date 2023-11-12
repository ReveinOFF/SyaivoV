import { Link, useNavigate, useParams } from "react-router-dom";
import "./productStyle.scss";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { LazyContext } from "../../components/lazy-context/lazy-contex";
import ProductsModal from "../../components/products-modal/products-modal";
import Slider from "react-slick";
import arrow from "../../assets/img/products/271220.svg";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [productS, setProductS] = useState();
  const [isOpen, setIsOpen] = useState();
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [typeDescription, setTypeDescription] = useState(1);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const setLoading = useContext(LazyContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  useEffect(() => {
    const GetSimilarProduct = async () => {
      setLoading(true);

      await axios
        .get(`${process.env.REACT_APP_SERVER_API}/api/product/similar/${id}`)
        .then((res) => {
          if (res.status === 200) setProductS(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    GetSimilarProduct();
  }, [id]);

  const settings = useMemo(
    () => ({
      autoplay: false,
      arrows: windowSize > 768 ? true : false,
      dots: false,
      slidesToShow:
        windowSize >= 1510
          ? 5
          : windowSize >= 1205
          ? 4
          : windowSize >= 820
          ? 3
          : 2,
      infinite: false,
      prevArrow: (
        <button>
          <img src={arrow} alt="arrow" />
        </button>
      ),
      nextArrow: (
        <button>
          <img src={arrow} alt="arrow" />
        </button>
      ),
    }),
    [windowSize]
  );

  return (
    <>
      {isOpen && <ProductsModal id={id} setShow={() => setIsOpen(false)} />}

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
        <div className="img-magnifier-container">
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
                  top: `${y - 200 / 2}px`,
                  left: `${x - 200 / 2}px`,
                  backgroundImage: `url('${process.env.REACT_APP_SERVER_API}/static/${product.image}')`,
                  backgroundSize: `${imgWidth * 2}px`,
                  backgroundPositionX: `${-x * 2 + 200 / 2}px`,
                  backgroundPositionY: `${-y * 2 + 150 / 2}px`,
                }}
              ></div>
            </>
          )}
        </div>

        <div className="info">
          <h1>{product ? product.name : "Загрузка..."}</h1>
          {product && parseInt(product.price) >= 1 && (
            <div>&#x2022; {product.price}</div>
          )}
          <button>Актуальну ціну, просимо уточнювати у менеджера</button>
          <hr />
          <div>
            <span>Категорія: </span>
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
            <>
              <button onClick={() => setIsOpen(true)}>Оновити</button>
              <button onClick={handleDelete}>Видалити</button>
            </>
          )}
        </div>
      </div>

      <div className="product-description">
        <div>
          <button
            className={typeDescription === 1 ? "active" : ""}
            onClick={() => setTypeDescription(1)}
          >
            Опис товару
          </button>
          {product?.color ||
            product?.fabric ||
            product?.fabric_warehouse ||
            product?.material ||
            (product?.size && (
              <button
                className={typeDescription === 2 ? "active" : ""}
                onClick={() => setTypeDescription(2)}
              >
                Характеристики
              </button>
            ))}
        </div>
        <hr />
        {typeDescription === 2 ? (
          <div>
            {product && (
              <>
                {product.size && (
                  <>
                    <h4>
                      Розмір: <span>{product.size}</span>
                    </h4>

                    <hr />
                  </>
                )}

                {product.color && (
                  <>
                    <h4>
                      Колір: <span>{product.color}</span>
                    </h4>

                    <hr />
                  </>
                )}

                {product.fabric && (
                  <>
                    <h4>
                      Тканина: <span>{product.fabric}</span>
                    </h4>

                    <hr />
                  </>
                )}

                {product.fabric_warehouse && (
                  <>
                    <h4>
                      Склад тканин: <span>{product.fabric_warehouse}</span>
                    </h4>

                    <hr />
                  </>
                )}

                {product.material && (
                  <>
                    <h4>
                      Матеріал: <span>{product.material}</span>
                    </h4>

                    <hr />
                  </>
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

      {productS && (
        <>
          <h1>Схожі товари</h1>
          <Slider {...settings} className="slider-s">
            {productS.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="product-block"
              >
                <img
                  src={`${process.env.REACT_APP_SERVER_API}/static/${item.image}`}
                  alt="product"
                />
                <div>
                  <h2>{item.name}</h2>
                  {parseInt(item.price) > 0 ? (
                    <h2>&#x2022; {item.price}</h2>
                  ) : (
                    <h2>&#x2022; Уточніть ціну</h2>
                  )}
                  <div>{item.description}</div>
                </div>
              </Link>
            ))}
          </Slider>
        </>
      )}
    </>
  );
};

export default Product;
