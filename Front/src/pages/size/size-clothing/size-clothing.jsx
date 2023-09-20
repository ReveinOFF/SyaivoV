import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";

const SizeCloth = () => {
  useEffect(() => {
    document.title = "Розміри одежи";
  }, []);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/size">Розміри</Link>
        <div>/</div>
        <NavLink to="/size/clothing">Одежа</NavLink>
      </div>
    </>
  );
};

export default SizeCloth;
