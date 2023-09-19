import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Price = () => {
  useEffect(() => {
    document.title = "Прайс";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/price">Прайс</NavLink>
      </div>
    </>
  );
};

export default Price;
