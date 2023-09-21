import { Link, NavLink } from "react-router-dom";
import "./productsStyle.scss";
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
        <NavLink to="/products">Список товарів</NavLink>
      </div>
    </>
  );
};

export default Products;
