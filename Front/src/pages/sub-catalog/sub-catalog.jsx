import { Link, NavLink, Navigate, useParams } from "react-router-dom";
import "./sub-catalogStyle.scss";
import { useCallback } from "react";
import Clothing from "../../components/sub-catalogs/clothing/clothing";
import Boots from "../../components/sub-catalogs/boots/boots";
import Protected from "../../components/sub-catalogs/protected/protected";

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
      default:
        return "Помилка";
    }
  }, [name]);

  const getSubCatalogComponent = useCallback(() => {
    switch (name) {
      case "clothing":
        return <Clothing />;
      case "boots":
        return <Boots />;
      case "protected":
        return <Protected />;
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
