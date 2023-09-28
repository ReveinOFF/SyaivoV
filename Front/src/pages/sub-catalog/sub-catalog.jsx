import { Link, NavLink, Navigate, useParams } from "react-router-dom";
import "./sub-catalogStyle.scss";
import { useCallback } from "react";

const SubCatalog = () => {
  const { name } = useParams();

  const getPageName = useCallback(() => {
    switch (name) {
      case "clothing":
        return "Спецодяг";
      case "boots":
        return "Взуття";
      case "protected":
        return "Засоби індивідуального захисту";
      case "household":
        return "Господарчі товари";
      default:
        return "Помилка";
    }
  }, [name]);

  const getSubCatalogComponent = useCallback(() => {
    switch (name) {
      case "clothing":
        return <></>;
      case "boots":
        return <></>;
      case "protected":
        return <></>;
      case "household":
        return <></>;
      default:
        return <Navigate to="/error" />;
    }
  }, [name]);

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <Link to="/catalog">Каталог</Link>
        <div>/</div>
        <NavLink to={`/catalog/${name}`}>{getPageName()}</NavLink>
      </div>

      {getSubCatalogComponent()}
    </>
  );
};

export default SubCatalog;
