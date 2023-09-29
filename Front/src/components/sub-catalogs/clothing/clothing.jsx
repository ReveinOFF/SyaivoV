import image from "../../../assets/img/temp/_________________64d0e4243704d.jpg";

const Clothing = () => {
  return (
    <>
      <div className="catalog-title">
        <h1>Спецодяг</h1>
        <hr />
      </div>

      <div className="sub-catalog">
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Головні убори</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Костюми та напівкомбінезони</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Одяг утеплений</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Одяг для зварювальників</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Одяг сигнальний</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Одяг камуфльрваний</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Одяг обмеженого терміну користування</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Одяг для захисту від вологи</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Халати, медичні та кухарські костюми</div>
        </div>
      </div>
    </>
  );
};

export default Clothing;
