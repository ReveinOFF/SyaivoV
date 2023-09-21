import { Link, NavLink } from "react-router-dom";
import "./productsStyle.scss";
import img19 from "../../../assets/img/admin/19.jpg";
import { useEffect } from "react";

const Products = () => {
  useEffect(() => {
    document.title = "Список товарів";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/admin">Адмін меню</Link>
        <div>/</div>
        <NavLink to="/admin/products">Список товарів</NavLink>
      </div>

      <button className="create">Добавити товар</button>

      <div className="product-list">
        <div>
          <img src={img19} alt="" />
          <div>Ыаавпвапра рапрап</div>
          <div>
            <button>Видалити</button>
          </div>
        </div>

        <div>
          <img src={img19} alt="" />
          <div>Ыаавпвапра рапрап</div>
          <div>
            <button>Видалити</button>
          </div>
        </div>

        <div>
          <img src={img19} alt="" />
          <div>Ыаавпвапра рапрап</div>
          <div>
            <button>Видалити</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
