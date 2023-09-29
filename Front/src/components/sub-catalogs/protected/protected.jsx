import image from "../../../assets/img/temp/_________________64d0e4243704d.jpg";

const Protected = () => {
  return (
    <>
      <div className="catalog-title">
        <h1>Засоби індивідуального захисту</h1>
        <hr />
      </div>

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
