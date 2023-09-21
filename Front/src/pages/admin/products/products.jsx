import { Link, NavLink } from "react-router-dom";
import "./productsStyle.scss";

const Products = () => {
  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/admin">Адмін меню</Link>
        <div>/</div>
        <NavLink to="/admin/products">Список товарів</NavLink>
      </div>
    </>
  );
};

export default Products;
