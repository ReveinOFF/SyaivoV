import image from "../../../assets/img/temp/_________________64d0e4243704d.jpg";
import { useEffect } from "react";

const Protected = () => {
  useEffect(() => {
    document.title = "Каталог ЗІЗ";
  }, []);

  const handleClick = () => {};

  return (
    <>
      <div className="catalog-title">
        <h1>Засоби індивідуального захисту</h1>
        <hr />
      </div>

      <button onClick={handleClick} className="add-sub-catalog">
        Добавити
      </button>

      <div className="sub-catalog">
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Захисні головні убори</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Захисні рукавиці</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Захисні наушники</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Захисні очки та стіклянні маски</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Захист від зімічних речовин</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Захист від падіння з висоти</div>
        </div>
      </div>
    </>
  );
};

export default Protected;
