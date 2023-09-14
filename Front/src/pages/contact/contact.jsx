import { Link } from "react-router-dom";
import "./contactStyle.scss";
import officeIcon from "../../assets/img/contact/521658.png";
import timeIcon from "../../assets/img/contact/time-icon-968-thumb.png";
import homePhoneIcon from "../../assets/img/contact/home-phone-icon-17.jpg";
import mobilePhoneIcon from "../../assets/img/contact/mobile-phone-icon-2636-thumb.png";
import mailIcon from "../../assets/img/contact/mail-227.png";

const Contact = () => {
  const handleSubmite = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="contact">
        <div className="info">
          <div>
            <img src={officeIcon} alt="office" />
            <div>
              м. Рівне, Рівненська обл.,
              <br />
              вул. Відінська, 39б.
            </div>
          </div>
          <div>
            <img src={timeIcon} alt="time" />
            <div>ПН-ПТ: 08:30-17:30</div>
          </div>
          <div>
            <img src={homePhoneIcon} alt="home phone" />
            <div>(0362) 62-98-08</div>
          </div>
          <div>
            <img src={mobilePhoneIcon} alt="mobile phone" />
            <div>
              <Link to="tel:+380677336594">(067) 733-65-94</Link>
              <Link to="tel:+380963282889">(096) 328-28-89</Link>
              <Link to="tel:+380503219592">(050) 321-95-92</Link>
            </div>
          </div>
          <div>
            <img src={mailIcon} alt="mail" />
            <Link to="mailto:ppsyaivo-v@ukr.net">ppsyaivo-v@ukr.net</Link>
          </div>
        </div>

        <form className="snd-msg" onSubmit={(e) => handleSubmite(e)}>
          <div>
            Ви також можете відправити лист на нашу електронну скриньку.
          </div>
          <input type="text" name="name" placeholder="Ваше ім'я" />
          <input type="email" name="email" placeholder="E-mail адреса" />
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

      <iframe
        className="map"
        src="https://maps.google.com/maps?q=Сяйво-В&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
        frameBorder="0"
        width="100%"
        height={250}
        allowFullScreen
      ></iframe>
    </>
  );
};

export default Contact;
