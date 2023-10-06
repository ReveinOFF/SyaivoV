import { useEffect } from "react";
import image from "../../../assets/img/temp/_________________64d0e4243704d.jpg";

const Boots = () => {
  useEffect(() => {
    document.title = "Каталог взуття";
  }, []);

  const handleClick = () => {};

  return (
    <>
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
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Черевики та чоботи робочі</div>
        </div>
      </div>
    </>
  );
};

export default Boots;
