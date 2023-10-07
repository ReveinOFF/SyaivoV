import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { LazyContext } from "../../lazy-context/lazy-contex";
import deleteImg from "../../../assets/img/subcatalog/1214594.png";
import CatalogModal from "../../catalog-modal/catalog-modal";

const Boots = () => {
  const [subCatalog, setSubCatalog] = useState([]);
  const location = useLocation();
  const setLoading = useContext(LazyContext);

  const pageUrl = useMemo(
    () => location.pathname.split("/")[location.pathname.split("/").length - 1],
    [location]
  );

  useEffect(() => {
    document.title = "Каталог взуття";
  }, []);

  useEffect(() => {
    const GetSubCatalogs = async () => {
      setLoading(true);

      await axios
        .get(`${process.env.REACT_APP_SERVER_API}/api/subcatalog/${pageUrl}`)
        .then((res) => {
          if (res.status === 200) setSubCatalog(res.data);
        })
        .finally(() => setLoading(false));
    };

    GetSubCatalogs();
  }, [pageUrl]);

  const handleClick = () => {};

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    await axios
      .delete(`${process.env.REACT_APP_SERVER_API}/api/subcatalog/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const cat = subCatalog.filter((i) => i.id !== id);
          setSubCatalog(cat);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <CatalogModal />

      <div className="catalog-title">
        <h1>Взуття</h1>
        <hr />
      </div>

      {localStorage.getItem("token") && (
        <button onClick={handleClick} className="add-sub-catalog">
          Добавити
        </button>
      )}

      <div className="sub-catalog">
        {subCatalog &&
          subCatalog.map((item) => (
            <Link
              key={item.id}
              to={`/products/${pageUrl}?type=${item.id}`}
              className="catalog-block"
            >
              <div className="image">
                <img
                  src={
                    item.image &&
                    `${process.env.REACT_APP_SERVER_API}/static/${item.image}`
                  }
                  alt="sub-catalog"
                />
              </div>
              <hr />
              <div className="name-catalog">{item.name}</div>
              {localStorage.getItem("token") && (
                <div
                  className="delete"
                  onClick={(e) => handleDelete(e, item.id)}
                >
                  <img src={deleteImg} alt="delete" />
                </div>
              )}
            </Link>
          ))}
      </div>
    </>
  );
};

export default Boots;
