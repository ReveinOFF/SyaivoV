import image from "../../../assets/img/temp/_________________64d0e4243704d.jpg";

const Boots = () => {
  return (
    <>
      <div className="catalog-title">
        <h1>Взуття</h1>
        <hr />
      </div>

      <div className="sub-catalog">
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Черевики та чоботи робочі</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Черевики та чоботи утеплені</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Черевики для зварювальників</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Туфлі, кросівки та сандалі</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Чоботи гумові</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Сабо</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Утеплювачі та шкарпетки</div>
        </div>
        <div className="catalog-block">
          <div className="image">
            <img src={image} alt="sub-catalog" />
          </div>
          <hr />
          <div>Взуття бортопрошивне</div>
        </div>
      </div>
    </>
  );
};

export default Boots;
