import { Link, NavLink } from "react-router-dom";
import "./companyStyle.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import Intersection from "../../components/intersection/intersection";

import video from "../../assets/video/0-02-05-19af0407ca6548f9154e480ac8ff47ce98d04127b4bc68ede833fd5fce23c579_ff2fe8b7ab6e7cf8.mp4";

import pausedIcon from "../../assets/img/company/375.png";
import playingIcon from "../../assets/img/company/16427.png";
import fullScreenIcon from "../../assets/img/company/23435345.png";

const Company = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef(null);
  const videoContRef = useRef(null);

  useEffect(() => {
    document.title = "Компанія";
  }, []);

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsPlaying(true);
      videoRef.current.play();
    } else {
      setIsPlaying(false);
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(videoRef.current);
  }, []);

  const yearCompany = useMemo(() => {
    const timeCreate = new Date(1998, 9, 18).getTime();
    const timeNow = new Date().getTime();
    const year = Math.abs(new Date(timeCreate - timeNow).getFullYear() - 1970);
    return year;
  }, []);

  const Muted = () => {
    if (videoRef.current) {
      if (isMuted) videoRef.current.volume = 1;
      else videoRef.current.volume = 0;
    }

    setIsMuted(!isMuted);
  };

  const playOrPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) videoRef.current.play();
      else videoRef.current.pause();
    }
  };

  const openFullscreen = () => {
    const video = videoContRef.current;

    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/company">Компанія</NavLink>
      </div>

      <div className="company">
        <Intersection>
          <h1 className="hidden">Фірма “СЯЙВО-В”</h1>

          <div className="hidden">
            <h4>Інформація про компанію:</h4>
            <div>
              Фірма “Сяйво-В” працює на ринку спецодягу з часу свого заснування
              в 1998 році. Наша діяльність безпосередньо пов'язана з
              виробництвом великого асортименту спецодягу для працівників різних
              сфер діяльності. Ми виготовляємо спецодяг з натуральних та
              змішаних тканин, високу якість яких гарантують відомі провідні
              виробники України, Турції, Пакистану, Польщі, Голландії та інших
              країн. Головним критерієм є поєднання індивідуального пошиття з
              серійним виробництвом, відповідність одягу сучасним тенденціям,
              європейській якості, функціональності і корпоративному стилю
              підприємства та задоволення вимог найвибагливіших покупців. Нас
              відрізняє високий рівень сервісу, гручкі ціни та індивідуальний
              комплексний підхід до кожного клієнта.
            </div>
          </div>

          <div className="work hidden">
            <h4>Наша робота:</h4>
            <div>
              <div>
                <span>1</span>{" "}
                <span>
                  Виробництво спецодягу під замовлення та реалізація зі складу
                  готового. Вишивка логотипу.
                </span>
              </div>
              <div>
                <span>2</span>{" "}
                <span>
                  Реалізація взуття, засобів захисту від вітчизняного та
                  зарубіжного виробника та супутніх товарів господарської групи.
                </span>
              </div>
            </div>
          </div>

          <hr />

          <div className="advantages hidden">
            <h4>Переваги нашої компанії:</h4>
            <ol>
              <li>
                Досвід і надійність:{" "}
                <span>
                  Ми на ринку вже {yearCompany} років, що свідчить про нашу
                  стабільність та великий досвід у галузі.
                </span>
              </li>
              <li>
                Репутація:{" "}
                <span>
                  Наша компанія має надійну репутацію, побудовану на чесності та
                  відмінному обслуговуванні клієнтів.
                </span>
              </li>
              <li>
                Широкий асортимент:{" "}
                <span>
                  Ми пропонуємо велику кількість товарів з різними ціновими
                  категоріями, щоб задовольнити потреби різних клієнтів.
                </span>
              </li>
              <li>
                Висока якість товарів:{" "}
                <span>
                  Наші товари відзначаються високою якістю, що гарантує
                  задоволення наших клієнтів.
                </span>
              </li>
              <li>
                Компетентність співробітників:{" "}
                <span>
                  Наші співробітники мають багатий досвід і високий рівень
                  кваліфікації, завдяки чому ми можемо надавати професійну
                  підтримку і консультації.
                </span>
              </li>
              <li>
                Інновації:{" "}
                <span>
                  Ми завжди вдосконалюємо наші товари і послуги, щоб бути на
                  передньому краї технологічних розробок і потреб споживачів.
                </span>
              </li>
              <li>
                Підтримка клієнтів:{" "}
                <span>
                  Наша компанія завжди готова слухати потреби наших клієнтів і
                  надавати їм індивідуальний підхід.
                </span>
              </li>
            </ol>
            <div>
              Завдяки цим перевагам ми є надійним і вигідним партнером для наших
              клієнтів.
            </div>
          </div>

          <div className="site-info hidden">
            <h4>Переваги нашої компанії:</h4>
            <ol>
              <li>
                <span>Каталог:</span>{" "}
                <ul>
                  <li>Опис і зображення продукції, представленої на сайті.</li>
                </ul>
              </li>
              <li>
                <span>Контакти:</span>{" "}
                <ul>
                  <li>
                    Контактні дані компанії, включаючи адресу, телефон та
                    електронну пошту.
                  </li>
                  <li>Форму для зв'язку з питаннями або запитами.</li>
                </ul>
              </li>
              <li>
                <span>Розміри:</span>{" "}
                <ul>
                  <li>Таблиці розмірів для взуття та одягу.</li>
                  <li>Рекомендації щодо вибору правильного розміру.</li>
                </ul>
              </li>
            </ol>
            <div>
              Эти страницы предоставляют пользователю полезную информацию о
              продукции, контактных данных компании, а также рекомендации по
              выбору размеров и информацию о ценах.
            </div>
          </div>

          <div className="additional hidden">
            <h4>Додаткова інформація:</h4>
            <div>
              Разом з робочим одягом пропонуємо споживачам широкий асортимент
              робочого взуття та засобів індивідуального захисту різних цінових
              категорій. Запрошуємо до взаємовигідної співпраці вже існуючих та
              потенційних партнерів.
            </div>
          </div>

          <hr />

          <div className="video-company hiddenBottom" ref={videoContRef}>
            <video
              src={video}
              loop
              ref={videoRef}
              muted
              playsInline
              disablePictureInPicture
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            <div onClick={Muted}>
              {isMuted ? (
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.22879 21.7629H6.59181C3.40105 21.7629 1.64746 20.1322 1.64746 17.1651V12.2608C1.64746 9.2937 3.40105 7.66302 6.59181 7.66302H8.47725C8.7805 7.66302 9.08375 7.5772 9.34745 7.43007L13.1974 5.18635C15.1224 4.07062 16.9947 3.86219 18.4714 4.62236C19.9481 5.38252 20.7524 6.96416 20.7524 9.08527V10.2623C20.7524 10.765 20.3041 11.1819 19.7635 11.1819C19.223 11.1819 18.7747 10.765 18.7747 10.2623V9.08527C18.7747 7.68754 18.3132 6.64538 17.5089 6.24078C16.7046 5.82391 15.518 6.00782 14.2391 6.75573L10.3891 8.98718C9.82211 9.33048 9.14968 9.50213 8.47725 9.50213H6.59181C4.50859 9.50213 3.6252 10.3236 3.6252 12.2608V17.1651C3.6252 19.1023 4.50859 19.9238 6.59181 19.9238H9.22879C9.76937 19.9238 10.2177 20.3406 10.2177 20.8433C10.2177 21.346 9.76937 21.7629 9.22879 21.7629ZM16.5491 25.2449C15.5074 25.2449 14.3604 24.9016 13.2133 24.2273C12.9912 24.0988 12.8331 23.8936 12.7738 23.6568C12.7144 23.42 12.7587 23.1709 12.8968 22.9644C13.035 22.7579 13.2556 22.6109 13.5103 22.5558C13.765 22.5006 14.0328 22.5417 14.2549 22.6702C15.5338 23.4058 16.7205 23.602 17.5247 23.1851C18.329 22.7683 18.7905 21.7261 18.7905 20.3406V15.8777C18.7905 15.375 19.2388 14.9582 19.7794 14.9582C20.3199 14.9582 20.7682 15.375 20.7682 15.8777V20.3406C20.7682 22.4495 19.9508 24.0434 18.4872 24.8035C17.8939 25.0978 17.2347 25.2449 16.5491 25.2449ZM23.7322 20.5368C23.5486 20.5368 23.3685 20.4892 23.2123 20.3995C23.0561 20.3097 22.9299 20.1812 22.8477 20.0285C22.7656 19.8757 22.7308 19.7047 22.7473 19.5347C22.7638 19.3646 22.8309 19.2021 22.9411 19.0655C23.7561 18.0522 24.2725 16.8586 24.439 15.6027C24.6055 14.3468 24.4164 13.0723 23.8904 11.9052C23.7896 11.6808 23.7884 11.4284 23.8873 11.2032C23.9861 10.978 24.1769 10.7984 24.4178 10.7037C24.9188 10.5075 25.499 10.7282 25.7099 11.1941C27.0548 14.1612 26.5933 17.6065 24.5233 20.1812C24.3255 20.4142 24.0355 20.5368 23.7322 20.5368Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M26.1439 23.6019C25.9603 23.6019 25.7803 23.5544 25.624 23.4646C25.4678 23.3748 25.3416 23.2463 25.2594 23.0936C25.1773 22.9408 25.1425 22.7699 25.159 22.5998C25.1755 22.4297 25.2426 22.2672 25.3528 22.1306C28.1744 18.6363 28.7941 13.9527 26.9746 9.91892C26.8737 9.6945 26.8726 9.44206 26.9714 9.21687C27.0703 8.99167 27.261 8.81207 27.502 8.71737C28.0162 8.5212 28.5831 8.74189 28.7941 9.2078C30.8905 13.8424 30.1785 19.2126 26.935 23.2341C26.7504 23.4793 26.4472 23.6019 26.1439 23.6019ZM2.63916 27.8944C2.38865 27.8944 2.13813 27.8086 1.94036 27.6247C1.75645 27.4516 1.65332 27.2181 1.65332 26.9748C1.65332 26.7315 1.75645 26.4981 1.94036 26.325L28.3102 1.80354C28.6926 1.44797 29.3254 1.44797 29.7078 1.80354C30.0902 2.1591 30.0902 2.74761 29.7078 3.10317L3.33796 27.6247C3.14019 27.8086 2.88967 27.8944 2.63916 27.8944Z"
                    fill="#FFFFFF"
                  />
                </svg>
              ) : (
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.63672 12.2609V17.1651C2.63672 19.6173 3.95521 20.8434 6.59219 20.8434H8.47764C8.96548 20.8434 9.45332 20.9782 9.87524 21.2112L13.7252 23.4549C17.0478 25.3921 19.7771 23.9821 19.7771 20.3407V9.08532C19.7771 5.43162 17.0478 4.03389 13.7252 5.97109L9.87524 8.21481C9.45332 8.44776 8.96548 8.58263 8.47764 8.58263H6.59219C3.95521 8.58263 2.63672 9.8087 2.63672 12.2609Z"
                    stroke="#FFFFFF"
                    strokeWidth="1.61307"
                  />
                  <path
                    d="M23.7324 9.80859C24.8749 11.2229 25.4926 12.944 25.4926 14.7129C25.4926 16.4818 24.8749 18.2029 23.7324 19.6172M26.1453 6.74341C28.0003 9.04229 29.0031 11.8388 29.0031 14.7129C29.0031 17.587 28.0003 20.3835 26.1453 22.6824"
                    stroke="#FFFFFF"
                    strokeWidth="1.61307"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <div onClick={openFullscreen}>
              <img src={fullScreenIcon} alt="full screen" />
            </div>

            {isPlaying ? (
              <img src={playingIcon} alt="playing" onClick={playOrPause} />
            ) : (
              <img src={pausedIcon} alt="paused" onClick={playOrPause} />
            )}
          </div>
        </Intersection>
      </div>
    </>
  );
};

export default Company;
