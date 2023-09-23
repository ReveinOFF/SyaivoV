import "./mainStyle.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import img1 from "../../assets/img/main/1620288416_7-phonoteka_org-p-zavod-fon-7.jpg";
import img2 from "../../assets/img/main/1672119667_3-46.jpg";
import img3 from "../../assets/img/main/575de2eecd54915546be74f9.jpg";
import img4 from "../../assets/img/main/1675548784_foni-club-p-fon-krasivii-doma-vnutri-1.jpg";
import img5 from "../../assets/img/main/vknjojXiAHA4cCWtkf29BjUY8Vg8jQ16caysEP3K.png";

import protectIcon from "../../assets/img/main/3712265.svg";
import priceIcon from "../../assets/img/main/price-icon-6.svg";
import garanteIcon from "../../assets/img/main/5663430.svg";
import profIcon from "../../assets/img/main/professional-profile-with-image.svg";

import clothingImg from "../../assets/img/main/43а.jpg";
import bootsImg from "../../assets/img/main/57.jpg";
import protectedImg from "../../assets/img/main/61а.jpg";
import homeImg from "../../assets/img/main/1cca2dce10a16c5ced916f02ff49d6c7.jpg";
import glovesImg from "../../assets/img/main/6288d02f2725bb2092dc2387e02fa163d2fe538e.jpg";

const Main = () => {
  const settings = {
    autoplay: true,
    arrows: true,
    dots: true,
    focusOnSelect: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <Slider {...settings} className="slider">
        <div className="image-block">
          <img
            src={img1}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
        </div>
        <div className="image-block">
          <img
            src={img2}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
        </div>
        <div className="image-block">
          <img
            src={img3}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
        </div>
        <div className="image-block">
          <img
            src={img4}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
        </div>
        <div className="image-block">
          <img
            src={img5}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
        </div>
      </Slider>

      <div className="info-block">
        <div className="card">
          <img src={profIcon} alt="professionals" />
          <div>
            <h4>Професіоналізм</h4>
            <div>Над товарами працюють люди з великим досвідом.</div>
          </div>
        </div>
        <div className="card">
          <img src={protectIcon} alt="protect" />
          <div>
            <h4>100% Безпека</h4>
            <div>Ми гарантуємо повну безпеку товару.</div>
          </div>
        </div>
        <div className="card">
          <img src={priceIcon} alt="price" />
          <div>
            <h4>Доступні ціни</h4>
            <div>Ціни падають, щоб підвищити ваш настрій!</div>
          </div>
        </div>
        <div className="card">
          <img src={garanteIcon} alt="garante" />
          <div>
            <h4>Гарантія якості</h4>
            <div>Ми відповідаємо вимогам та стандартам якості.</div>
          </div>
        </div>
      </div>

      <div className="catalog">
        <div className="card">
          <div>
            <img src={glovesImg} alt="gloves" />
          </div>
          <div>
            <div>
              <h1>Рукавиці</h1>
              <div>Знайдіть зручні і якісні рукавиці.</div>
              <button>Переглянути</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div>
            <img src={clothingImg} alt="clothing" />
          </div>
          <div>
            <div>
              <h1>Спецодяг</h1>
              <div>Оберіть надійний спецодяг.</div>
              <button>Переглянути</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div>
            <img src={bootsImg} alt="boots" />
          </div>
          <div>
            <div>
              <h1>Взуття</h1>
              <div>Зручне взуття для всіх випадків.</div>
              <button>Переглянути</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div>
            <img src={homeImg} alt="home" />
          </div>
          <div>
            <div>
              <h1>Господарчі товари</h1>
              <div>Забезпечте комфорт у домі.</div>
              <button>Переглянути</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div>
            <img src={protectedImg} alt="protect" />
          </div>
          <div>
            <div>
              <h1>Засоби індивідуального захисту</h1>
              <div>Дбайте про свою безпеку.</div>
              <button>Переглянути</button>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="several-products">
        <h1>Новинки:</h1>
        <div>
          <div className="card">
            <img src={bootsImg} alt="boots" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
          <div className="card">
            <img src={bootsImg} alt="boots" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
          <div className="card">
            <img src={clothingImg} alt="clothing" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
          <div className="card">
            <img src={bootsImg} alt="boots" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
          <div className="card">
            <img src={bootsImg} alt="boots" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
        </div>
        <button>Переглянути всі товари</button>
      </div>

      <hr />

      <div className="info-text"></div>
    </>
  );
};

export default Main;
