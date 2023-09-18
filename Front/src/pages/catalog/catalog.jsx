import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Catalog = () => {
  useEffect(() => {
    document.title = "Каталог";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/size">Розміри</NavLink>
      </div>
    </>
  );
};

export default Catalog;
