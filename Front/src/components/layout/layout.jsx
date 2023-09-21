import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import scrollIcon from "../../assets/img/layout/4146496-200.png";
import "./layoutStyle.scss";

const Layout = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisiblity = () => {
      window.pageYOffset > 150 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisiblity);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisiblity);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
        <img
          src={scrollIcon}
          style={showButton ? { opacity: 1 } : { opacity: 0 }}
          alt="scroll top"
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
