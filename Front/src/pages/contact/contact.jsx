import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./contactStyle.scss";
import officeIcon from "../../assets/img/contact/521658.png";
import timeIcon from "../../assets/img/contact/time-icon-968-thumb.png";
import homePhoneIcon from "../../assets/img/contact/home-phone-icon-17.jpg";
import mobilePhoneIcon from "../../assets/img/contact/mobile-phone-icon-2636-thumb.png";
import mailIcon from "../../assets/img/contact/546394.png";
import instagram from "../../assets/img/contact/instagram-logo-icon-512x512-155lpz3w.png";
import Intersection from "../../components/intersection/intersection";

const Contact = () => {
  useEffect(() => {
    document.title = "Контакти";
  }, []);

  const handleSubmite = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="pages">
        <Link to="/">Головна</Link>
        <div>/</div>
        <NavLink to="/contact">Контакти</NavLink>
      </div>

      <Intersection>
        <div className="contact">
          <div className="info hidden">
            <div>
              <h2>Наш офіс тут:</h2>
              <div>
                <img draggable="false" src={officeIcon} alt="office" />
                <div>
                  м. Рівне, Рівненська обл.,
                  <br />
                  вул. Відінська, 39б.
                </div>
              </div>
            </div>

            <div>
              <h2>Контактна інформація:</h2>
              <div>
                <img draggable="false" src={homePhoneIcon} alt="home phone" />
                <div>(0362) 62-98-08</div>
              </div>
              <div>
                <img
                  draggable="false"
                  src={mobilePhoneIcon}
                  alt="mobile phone"
                />
                <div>
                  <Link to="tel:+380677336594">(067) 733-65-94</Link>
                  <Link to="tel:+380963282889">(096) 328-28-89</Link>
                  <Link to="tel:+380503219592">(050) 321-95-92</Link>
                </div>
              </div>
              <div>
                <img draggable="false" src={mailIcon} alt="mail" />
                <Link to="mailto:ppsyaivo-v@ukr.net">ppsyaivo-v@ukr.net</Link>
              </div>
              <div>
                <img draggable="false" src={instagram} alt="mail" />
                <Link to="https://www.instagram.com/syaivo_v/" target="_blank">
                  syaivo_v
                </Link>
              </div>
            </div>

            <div>
              <h2>РЕЖИМ РОБОТИ:</h2>
              <div>
                <img draggable="false" src={timeIcon} alt="time" />
                <div>
                  <div>ПН-ПТ: 08:30-17:30</div>
                  <div>СБ-НД: Вихідний</div>
                </div>
              </div>
            </div>
          </div>

          <form className="snd-msg hidden" onSubmit={(e) => handleSubmite(e)}>
            <div>Ви також можете відправити лист з вашим зверненням.</div>
            <div>
              <input type="text" name="name" placeholder="Ім'я" />
              <input type="email" name="email" placeholder="E-mail" />
            </div>
            <input type="text" name="subject" placeholder="Тема повідомлення" />
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Повідомлення"
            />
            <button type="submit">Відправити</button>
          </form>
        </div>

        <hr className="hr-block" />

        <iframe
          className="map hiddenBottom"
          title="geolocation"
          src="https://maps.google.com/maps?q=Сяйво-В&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          frameBorder="0"
          loading="lazy"
          width="100%"
          height={350}
          allowFullScreen
        />
      </Intersection>
    </>
  );
};

export default Contact;
