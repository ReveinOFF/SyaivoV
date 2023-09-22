import "./mainStyle.scss";
import img1 from "../../assets/img/main/5-oshibok-shvei-v-rabote-na-shveynoy-mashinke-2.jpg";
import img2 from "../../assets/img/main/vakan_7baca.jpg";
import protectIcon from "../../assets/img/main/3712265.png";
import priceIcon from "../../assets/img/main/price-icon-6.png";
import garanteIcon from "../../assets/img/main/5663430.png";
import profIcon from "../../assets/img/main/professional-profile-with-image.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Main = () => {
  const settings = {
    autoplay: true,
    arrows: true,
    dots: true,
    focusOnSelect: true,
  };

  return (
    <>
      <Slider {...settings} className="slider">
        <div className="image-block">
          <img src={img1} alt="" />
        </div>
        <div className="image-block">
          <img src={img2} alt="" />
        </div>
      </Slider>

      <div className="info-block">
        <div>
          <img src={profIcon} alt="" />
          <div>
            <h4>Професіоналізм</h4>
            <div>Над товарами працюють люди з великим досвідом.</div>
          </div>
        </div>
        <div>
          <img src={protectIcon} alt="" />
          <div>
            <h4>100% Безпека</h4>
            <div>Ми гарантуємо повну безпеку товару.</div>
          </div>
        </div>
        <div>
          <img src={priceIcon} alt="" />
          <div>
            <h4>Доступні ціни</h4>
            <div>Ціни падають, щоб підвищити ваш настрій!</div>
          </div>
        </div>
        <div>
          <img src={garanteIcon} alt="" />
          <div>
            <h4>Гарантія якості</h4>
            <div>Ми відповідаємо вимогам та стандартам якості.</div>
          </div>
        </div>
      </div>

      {/* <div className="catalog">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="new-products">
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <button>Подивитися усі товари</button>
      </div>

      <div className="info-text"></div> */}
    </>
  );
};

export default Main;
