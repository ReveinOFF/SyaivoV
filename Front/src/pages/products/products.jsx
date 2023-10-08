import { Link, NavLink, useParams, useSearchParams } from "react-router-dom";
import "./productsStyle.scss";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { LazyContext } from "../../components/lazy-context/lazy-contex";

const Products = () => {
  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [typeView, setTypeView] = useState(
    parseInt(searchParams.get("type-view")) || 1
  );
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [products, setProducts] = useState();
  const selectFilterRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const setLoading = useContext(LazyContext);

  useEffect(() => {
    document.title = "Список товарів";
  }, []);

  useEffect(() => {
    const GetProducts = async () => {
      setLoading(true);

      const params = new URLSearchParams();

      if (searchParams.get("type")) {
        params.append("type", searchParams.get("type"));
      }
      if (searchParams.get("page")) {
        params.append("page", searchParams.get("page"));
      }
      if (name) {
        params.append("catalog", name);
      }
      if (searchParams.get("sort")) {
        params.append("sort", searchParams.get("sort"));
      }

      await axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/product?${params.toString()}`
        )
        .then((res) => {
          setProducts(res.data.products);
          setTotalPage(res.data.totalPage);
        })
        .finally(() => setLoading(false));
    };

    GetProducts();
  }, [searchParams, name]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectFilterRef.current &&
        !selectFilterRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (pageNumber) => {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);

    window.location.reload();
  };

  const generateButtons = useCallback(() => {
    const buttons = [];
    let start = Math.max(
      1,
      Math.min(currentPage - Math.floor(5 / 2), totalPage - 4)
    );
    let end = Math.min(totalPage, start + 4);

    if (end - start + 1 < 5) {
      start = Math.max(1, end - 5 + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <div
          key="prev"
          className="page"
          onClick={() => handlePageChange(parseInt(currentPage) - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5.97"
            height="10"
            viewBox="0 0 5.97 10"
            style={{ rotate: "180deg" }}
          >
            <path
              d="M1302.98,2891a0.972,0.972,0,0,1-.23.62c-0.02.03-.03,0.06-0.05,0.09h-0.01l-4.03,3.99a0.955,0.955,0,0,1-1.39,0,1.014,1.014,0,0,1,0-1.41l3.32-3.29-3.3-3.32a0.99,0.99,0,0,1,1.4-1.4l3.98,3.99a0.077,0.077,0,0,0,.03.02A1.031,1.031,0,0,1,1302.98,2891Z"
              transform="translate(-1297 -2886)"
            ></path>
          </svg>
        </div>
      );
    }

    if (currentPage >= 4) {
      buttons.push(
        <>
          <div onClick={() => handlePageChange(1)} className={"page"}>
            1
          </div>
          <div className="page-space">...</div>
        </>
      );
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <div
          key={i}
          onClick={() => {
            if (i !== currentPage) handlePageChange(i);
          }}
          className={`page ${i === currentPage ? "active" : ""}`}
        >
          {i}
        </div>
      );
    }

    if (totalPage - 3 >= currentPage) {
      buttons.push(
        <>
          <div className="page-space">...</div>
          <div onClick={() => handlePageChange(totalPage)} className={"page"}>
            {totalPage}
          </div>
        </>
      );
    }

    if (currentPage < totalPage) {
      buttons.push(
        <div
          key="next"
          className="page"
          onClick={() => handlePageChange(parseInt(currentPage) + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5.97"
            height="10"
            viewBox="0 0 5.97 10"
          >
            <path
              d="M1302.98,2891a0.972,0.972,0,0,1-.23.62c-0.02.03-.03,0.06-0.05,0.09h-0.01l-4.03,3.99a0.955,0.955,0,0,1-1.39,0,1.014,1.014,0,0,1,0-1.41l3.32-3.29-3.3-3.32a0.99,0.99,0,0,1,1.4-1.4l3.98,3.99a0.077,0.077,0,0,0,.03.02A1.031,1.031,0,0,1,1302.98,2891Z"
              transform="translate(-1297 -2886)"
            ></path>
          </svg>
        </div>
      );
    }

    return buttons;
  }, [currentPage, totalPage]);

  const getPageName = useCallback(() => {
    switch (name) {
      case undefined:
        return "Весь список";
      case "clothing":
        return "Спецодяг";
      case "boots":
        return "Взуття";
      case "protected":
        return "Засоби індивідуального захисту";
      case "gloves":
        return "Рукавиці";
      case "household":
        return "Господарчі товари";
      case "embroidery":
        return "Комп'ютерна вишивка";
      default:
        return "Помилка";
    }
  }, [name]);

  const getSortName = useCallback(() => {
    switch (searchParams.get("sort")) {
      case undefined:
        return "За замовченням";
      case "name-a":
        return "Назва (А - Я)";
      case "name-b":
        return "Назва (Я - А)";
      case "price-a":
        return "Ціна (Низька > Висока)";
      case "price-b":
        return "Ціна (Висока > Низька)";
      default:
        return "За замовченням";
    }
  }, [searchParams]);

  const handleSortParams = (name) => {
    if (name === undefined && searchParams.has("sort")) {
      searchParams.delete("sort");
      setSearchParams(searchParams);
    } else {
      searchParams.set("sort", name);
      setSearchParams(searchParams);
    }

    window.location.reload();
  };

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/products">Список товарів</Link>
        {name && (
          <>
            <div>/</div>
            <NavLink to={`/products/${name}`}>{getPageName()}</NavLink>
          </>
        )}
      </div>

      <div className="product-list">
        <div className="category">
          <h2>Категорії товарів:</h2>

          <hr />

          {/* Need change */}
          <div>
            <NavLink end to="/products">
              Весь список
            </NavLink>

            <div className="product-item">
              <NavLink to="/products/boots">
                Взуття <span>&#8250;</span>
              </NavLink>
              <div>
                <Link to="/products/boots?type=1">
                  Черевики та чоботи робочі
                </Link>
                <Link to="/products/boots?type=2">
                  Черевики та чоботи утеплені
                </Link>
                <Link to="/products/boots?type=3">
                  Черевики для зварювальників
                </Link>
                <Link to="/products/boots?type=4">
                  Туфлі, кросівки та сандалі
                </Link>
                <Link to="/products/boots?type=5">Чоботи гумові</Link>
                <Link to="/products/boots?type=6">Сабо</Link>
                <Link to="/products/boots?type=7">Утеплювачі та шкарпетки</Link>
                <Link to="/products/boots?type=8">Взуття бортопрошивне</Link>
              </div>
            </div>

            <div className="product-item">
              <NavLink to="/products/clothing">
                Спецодяг <span>&#8250;</span>
              </NavLink>

              <div>
                <Link to="/products/boots?type=1">Головні убори</Link>
                <Link to="/products/boots?type=2">
                  Костюми та напівкомбінезони
                </Link>
                <Link to="/products/boots?type=3">Одяг утеплений</Link>
                <Link to="/products/boots?type=4">Одяг для зварювальників</Link>
                <Link to="/products/boots?type=5">Одяг сигнальний</Link>
                <Link to="/products/boots?type=6">Одяг камуфльрваний</Link>
                <Link to="/products/boots?type=7">
                  Одяг обмеженого терміну користування
                </Link>
                <Link to="/products/boots?type=8">
                  Одяг для захисту від вологи
                </Link>
                <Link to="/products/boots?type=9">
                  Халати, медичні та кухарські костюми
                </Link>
              </div>
            </div>

            <NavLink to="/products/gloves">Рукавиці</NavLink>
            <NavLink to="/products/household">Господарчі товари</NavLink>
            <NavLink to="/products/embroidery">Комп'ютерна вишивка</NavLink>

            <div className="product-item">
              <NavLink to="/products/protected">
                Засоби індивідуального захисту <span>&#8250;</span>
              </NavLink>

              <div>
                <Link to="/products/boots?type=1">Захисні головні убори</Link>
                <Link to="/products/boots?type=2">Захисні рукавиці</Link>
                <Link to="/products/boots?type=3">Захисні наушники</Link>
                <Link to="/products/boots?type=4">
                  Захисні очки та стіклянні маски
                </Link>
                <Link to="/products/boots?type=5">
                  Захист від зімічних речовин
                </Link>
                <Link to="/products/boots?type=6">
                  Захист від падіння з висоти
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="products-block">
          <h1>{getPageName()}</h1>

          <div className="filter">
            <div className={`select-visible ${typeView === 2 && "right-view"}`}>
              <button
                onClick={() => {
                  setTypeView(1);
                  searchParams.set("type-view", 1);
                  setSearchParams(searchParams);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke={typeView === 1 ? "orange" : "#000"}
                    strokeWidth="1.5"
                    d="M4.8 1H1.2a.2.2 0 00-.2.2v3.029c0 .11.09.2.2.2h3.6a.2.2 0 00.2-.2V1.2a.2.2 0 00-.2-.2zM16.8 1H8.2a.2.2 0 00-.2.2v3.029c0 .11.09.2.2.2h8.6a.2.2 0 00.2-.2V1.2a.2.2 0 00-.2-.2zM4.8 7.286H1.2a.2.2 0 00-.2.2v3.028c0 .11.09.2.2.2h3.6a.2.2 0 00.2-.2V7.486a.2.2 0 00-.2-.2zM16.8 7.286H8.2a.2.2 0 00-.2.2v3.028c0 .11.09.2.2.2h8.6a.2.2 0 00.2-.2V7.486a.2.2 0 00-.2-.2zM4.8 13.571H1.2a.2.2 0 00-.2.2V16.8c0 .11.09.2.2.2h3.6a.2.2 0 00.2-.2v-3.029a.2.2 0 00-.2-.2zM16.8 13.571H8.2a.2.2 0 00-.2.2V16.8c0 .11.09.2.2.2h8.6a.2.2 0 00.2-.2v-3.029a.2.2 0 00-.2-.2z"
                  ></path>
                </svg>
              </button>

              <button
                onClick={() => {
                  setTypeView(2);
                  searchParams.set("type-view", 2);
                  setSearchParams(searchParams);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke={typeView === 2 ? "orange" : "#000"}
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M6.5 1H2a1 1 0 00-1 1v4.5a1 1 0 001 1h4.5a1 1 0 001-1V2a1 1 0 00-1-1zM16 1h-4.5a1 1 0 00-1 1v4.5a1 1 0 001 1H16a1 1 0 001-1V2a1 1 0 00-1-1zM6.5 10.5H2a1 1 0 00-1 1V16a1 1 0 001 1h4.5a1 1 0 001-1v-4.5a1 1 0 00-1-1zM16 10.5h-4.5a1 1 0 00-1 1V16a1 1 0 001 1H16a1 1 0 001-1v-4.5a1 1 0 00-1-1z"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              className={`select-filter ${isOpen ? "open" : ""}`}
              ref={selectFilterRef}
            >
              <button onClick={toggleMenu}>
                <span>{getSortName()}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="5"
                  fill="none"
                  viewBox="0 0 7 5"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M3.174 2.856a.5.5 0 00.707-.004L6.144.562a.5.5 0 01.712.704L4.592 3.555a1.5 1.5 0 01-2.121.012L.148 1.27A.5.5 0 11.852.559l2.322 2.297z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <ul>
                <li
                  style={{
                    pointerEvents: searchParams.get("sort") === null && "none",
                    color: searchParams.get("sort") === null && "orange",
                  }}
                  onClick={() => handleSortParams()}
                >
                  За замовченням
                </li>
                <hr />
                <li
                  style={{
                    pointerEvents:
                      searchParams.get("sort") === "name-a" && "none",
                    color: searchParams.get("sort") === "name-a" && "orange",
                  }}
                  onClick={() => handleSortParams("name-a")}
                >
                  Назва (А - Я)
                </li>
                <hr />
                <li
                  style={{
                    pointerEvents:
                      searchParams.get("sort") === "name-b" && "none",
                    color: searchParams.get("sort") === "name-b" && "orange",
                  }}
                  onClick={() => handleSortParams("name-b")}
                >
                  Назва (Я - А)
                </li>
                <hr />
                <li
                  style={{
                    pointerEvents:
                      searchParams.get("sort") === "price-a" && "none",
                    color: searchParams.get("sort") === "price-a" && "orange",
                  }}
                  onClick={() => handleSortParams("price-a")}
                >
                  Ціна (Низька {">"} Висока)
                </li>
                <hr />
                <li
                  style={{
                    pointerEvents:
                      searchParams.get("sort") === "price-b" && "none",
                    color: searchParams.get("sort") === "price-b" && "orange",
                  }}
                  onClick={() => handleSortParams("price-b")}
                >
                  Ціна (Висока {">"} Низька)
                </li>
              </ul>
            </div>
          </div>

          <div
            className={
              parseInt(searchParams.get("type-view")) === 2
                ? "list-type2"
                : "list-type1"
            }
          >
            {products &&
              products.map((item) => (
                <Link
                  key={item.id}
                  className="product"
                  to={`/product/${item.id}`}
                >
                  <div className="product-image">
                    <img
                      src={`${process.env.REACT_APP_SERVER_API}/static/${item.image}`}
                      alt={item.id}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{item.name}</h3>
                    <div>{item.description}</div>
                    <div>&#x2022; {item.price}</div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="select-pages">{generateButtons()}</div>
        </div>
      </div>
    </>
  );
};

export default Products;
