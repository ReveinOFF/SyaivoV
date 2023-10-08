import { useContext, useRef, useState } from "react";
import "./catalog-modalStyle.scss";
import cross from "../../assets/img/subcatalog/icon-close-512.png";
import axios from "axios";
import { LazyContext } from "../lazy-context/lazy-contex";
import { useNavigate } from "react-router-dom";

const CatalogModal = ({ catKey, isShow, setShow }) => {
  const [image, setImage] = useState();
  const setLoading = useContext(LazyContext);
  const navigate = useNavigate();
  const imageRef = useRef();

  const imageChange = (e) => {
    const createUrl = URL.createObjectURL(e.target.files[0]);

    setImage(URL.createObjectURL(e.target.files[0]));

    URL.revokeObjectURL(createUrl);
  };

  const handleSubmite = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("image", e.target[0].files[0]);
    formData.append("name", e.target[1].value);
    formData.append("catalog_key", catKey);

    await axios
      .post(`${process.env.REACT_APP_SERVER_API}/api/subcatalog`, formData)
      .then((res) => {
        if (res.status === 201) window.location.reload();
        else navigate("/error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {isShow && (
        <div className="catalog-modal">
          <form onSubmit={handleSubmite} className="catalog-block">
            <img src={cross} alt="close" onClick={setShow} />
            <div className="img-catal" onClick={() => imageRef.current.click()}>
              {image && <img src={image} alt="" />}
              {!image && (
                <div>
                  <div>Завантажити фото</div>
                  <svg
                    width="270"
                    height="150"
                    viewBox="0 0 375 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M95.4722 56.2152C99.6732 49.6003 109.327 49.6003 113.528 56.2152L184.566 168.072C189.088 175.192 183.973 184.5 175.539 184.5H33.4614C25.0268 184.5 19.9117 175.192 24.4336 168.072L95.4722 56.2152Z"
                      fill="white"
                    />
                    <path
                      d="M288.284 86.6536C292.42 79.6286 302.58 79.6286 306.716 86.6536L355.126 168.88C359.323 176.009 354.183 185 345.91 185H249.09C240.817 185 235.677 176.009 239.874 168.88L288.284 86.6536Z"
                      fill="white"
                    />
                    <path
                      d="M194.081 8.306C197.681 3.98391 204.319 3.9839 207.919 8.30599L325.527 149.48C330.414 155.346 326.243 164.25 318.608 164.25H83.3923C75.7573 164.25 71.5859 155.346 76.4728 149.48L194.081 8.306Z"
                      fill="white"
                    />
                    <rect x="81" y="116" width="224" height="69" fill="white" />
                    <ellipse
                      cx="310.769"
                      cy="18.484"
                      rx="18.5698"
                      ry="16.9818"
                      fill="white"
                    />
                    <ellipse
                      cx="95.6003"
                      cy="120.745"
                      rx="9.2849"
                      ry="8.49091"
                      fill="#F3F3F3"
                    />
                    <ellipse
                      cx="230.435"
                      cy="99.3319"
                      rx="5.24799"
                      ry="4.79921"
                      fill="#F3F3F3"
                    />
                    <rect
                      x="271.403"
                      y="104.413"
                      width="8.23553"
                      height="49.6442"
                      rx="4.11776"
                      fill="#F3F3F3"
                      stroke="#F3F3F3"
                      strokeWidth="0.562874"
                    />
                    <rect
                      x="303.221"
                      y="125.655"
                      width="7.48314"
                      height="54.3391"
                      rx="3.74157"
                      transform="rotate(90 303.221 125.655)"
                      fill="#F3F3F3"
                      stroke="#F3F3F3"
                      strokeWidth="0.562874"
                    />
                  </svg>
                </div>
              )}
              <input type="file" name="image" onChange={imageChange} />
            </div>
            <input type="text" name="name" placeholder="Назва каталогу" />
            <button type="submit">Створити</button>
          </form>
        </div>
      )}
    </>
  );
};

export default CatalogModal;
