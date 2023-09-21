import { Link, NavLink } from "react-router-dom";
import "./productsStyle.scss";

const Products = () => {
  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/products">Список товарів</NavLink>
      </div>
    </>
  );
};

export default Products;
