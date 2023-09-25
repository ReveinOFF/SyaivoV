import "./mainStyle.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMemo } from "react";
import Slider from "react-slick";

import img1 from "../../assets/img/main/1620288416_7-phonoteka_org-p-zavod-fon-7.jpg";
import img2 from "../../assets/img/main/1672119667_3-46.jpg";
import img3 from "../../assets/img/main/575de2eecd54915546be74f9.jpg";
import img4 from "../../assets/img/main/1672252521_kalix-club-p-dom-vnutri-fon-krasivo-2.jpg";
import img5 from "../../assets/img/main/vknjojXiAHA4cCWtkf29BjUY8Vg8jQ16caysEP3K.png";

import imgPng1 from "../../assets/img/main/pngwing.com.png";
import imgPng2 from "../../assets/img/main/pngwin454g.com.png";
import imgPng3 from "../../assets/img/main/pngwing.com (1).png";
import imgPng4 from "../../assets/img/main/Без имени-1.png";
import imgPng5 from "../../assets/img/main/3747759848_w600_h600_3747759848.png";

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
  const settings = useMemo(
    () => ({
      autoplay: true,
      arrows: true,
      dots: true,
      focusOnSelect: true,
      autoplaySpeed: 7000,
    }),
    []
  );

  return (
    <>
      <Slider {...settings} className="slider hiddenTop">
        <div className="image-block">
          <img
            src={img1}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <img
            src={imgPng1}
            className="image-slider img-p1"
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <div
            className="info-category"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          >
            <h1>Засоби індивідуального захисту</h1>
            <div>
              Наша продукція забезпечить вас надійним захистом в різних
              ситуаціях. Ми дбаємо про вашу безпеку та комфорт.
            </div>
          </div>
        </div>
        <div className="image-block">
          <img
            src={img2}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <img
            src={imgPng2}
            className="image-slider img-p2"
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <div
            className="info-category"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          >
            <h1>Спецодяг</h1>
            <div>
              Вишуканий та практичний спецодяг для робочих та професіоналів
              різних галузей. Ми пропонуємо моделі, які поєднують в собі
              безпеку, стиль та функціональність.
            </div>
          </div>
        </div>
        <div className="image-block">
          <img
            src={img3}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <img
            src={imgPng3}
            className="image-slider img-p3"
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <div
            className="info-category"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          >
            <h1>Взуття</h1>
            <div>
              Широкий вибір взуття для різних потреб – від робочого взуття до
              стильних та комфортних моделей на кожен день. Оберіть взуття, яке
              вам підходить.
            </div>
          </div>
        </div>
        <div className="image-block">
          <img
            src={img4}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <img
            src={imgPng4}
            className="image-slider img-p4"
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <div
            className="info-category"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          >
            <h1>Господарчі товари</h1>
            <div>
              Наші господарчі товари допоможуть вам забезпечити ваше
              господарство всім необхідним. Від побутової хімії до приладів для
              кухні – ми маємо все для вашого комфорту вдома.
            </div>
          </div>
        </div>
        <div className="image-block">
          <img
            src={img5}
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <img
            src={imgPng5}
            className="image-slider img-p5"
            alt="image"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          />
          <div
            className="info-category"
            onMouseDown={(e) => (e.currentTarget.style = "cursor: grabbing")}
            onMouseUp={(e) => (e.currentTarget.style = "cursor: default")}
          >
            <h1>Рукавиці</h1>
            <div>
              Наш асортимент рукавиць включає в себе якісні та зносостійкі
              моделі для різних видів робіт і активностей. Забезпечте свої руки
              надійним захистом і комфортом.
            </div>
          </div>
        </div>
      </Slider>

      <div className="info-block">
        <div className="card hiddenLeft">
          <img src={profIcon} alt="professionals" />
          <div>
            <h4>Професіоналізм</h4>
            <div>Над товарами працюють люди з великим досвідом.</div>
          </div>
        </div>
        <div className="card hiddenLeft">
          <img src={protectIcon} alt="protect" />
          <div>
            <h4>100% Безпека</h4>
            <div>Ми гарантуємо повну безпеку товару.</div>
          </div>
        </div>
        <div className="card hiddenRight">
          <img src={priceIcon} alt="price" />
          <div>
            <h4>Доступні ціни</h4>
            <div>Ціни падають, щоб підвищити ваш настрій!</div>
          </div>
        </div>
        <div className="card hiddenRight">
          <img src={garanteIcon} alt="garante" />
          <div>
            <h4>Гарантія якості</h4>
            <div>Ми відповідаємо вимогам та стандартам якості.</div>
          </div>
        </div>
      </div>

      <div className="catalog">
        <div className="card hiddenBottom">
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

        <div className="card hiddenBottom">
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

        <div className="card hiddenBottom">
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

        <div className="card hiddenBottom">
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

        <div className="card hiddenBottom">
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
        <h1 className="hidden">Новинки:</h1>
        <div>
          <div className="card hiddenAnimation">
            <img src={bootsImg} alt="boots" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
          <div className="card card2 hiddenAnimation">
            <img src={bootsImg} alt="boots" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
          <div className="card card3 hiddenAnimation">
            <img src={clothingImg} alt="clothing" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
          <div className="card card4 hiddenAnimation">
            <img src={bootsImg} alt="boots" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
          <div className="card card5 hiddenAnimation">
            <img src={bootsImg} alt="boots" />
            <div>
              <h1>Sagff dfgd dd</h1>
              <h1>&#x2022; 16&#8372;</h1>
              <button>Детальніше</button>
            </div>
          </div>
        </div>
        <button className="hiddenBottom">Переглянути всі товари</button>
      </div>

      <hr />

      <div className="info-text">
        <div className="hidden">
          <h2>Про компанію:</h2>
          <div>
            Фірма “Сяйво-В” працює на ринку спецодягу з часу свого заснування в
            1998 році. Наша діяльність безпосередньо пов'язана з виробництвом
            великого асортименту спецодягу для працівників різних сфер
            діяльності. Ми виготовляємо спецодяг з натуральних та змішаних
            тканин, високу якість яких гарантують відомі провідні виробники
            України, Турції, Пакистану, Польщі, Голландії та інших країн.
            Головним критерієм є поєднання індивідуального пошиття з серійним
            виробництвом, відповідність одягу сучасним тенденціям, європейській
            якості, функціональності і корпоративному стилю підприємства та
            задоволення вимог найвибагливіших покупців. Нас відрізняє високий
            рівень сервісу, гручкі ціни та індивідуальний комплексний підхід до
            кожного клієнта.
          </div>
        </div>
        <div className="hidden">
          <h2>Що ми робимо:</h2>
          <ol>
            <li>
              Виробництво спецодягу під замовлення та реалізація зі складу
              готового. Вишивка логотипу.
            </li>
            <li>
              Реалізація взуття, засобів захисту від вітчизняного та зарубіжного
              виробника та супутніх товарів господарської групи.
            </li>
          </ol>
        </div>
        <div className="hidden">
          <h2>Додаткова інформація:</h2>
          <div>
            Разом з робочим одягом пропонуємо споживачам широкий асортимент
            робочого взуття та засобів індивідуального захисту різних цінових
            категорій. Запрошуємо до взаємовигідної співпраці вже існуючих та
            потенційних партнерів.
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
