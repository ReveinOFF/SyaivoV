import { useContext, useState } from "react";
import "./catalog-modalStyle.scss";
import cross from "../../assets/img/subcatalog/icon-close-512.png";
import axios from "axios";
import { LazyContext } from "../lazy-context/lazy-contex";
import { useNavigate } from "react-router-dom";

const CatalogModal = ({ catKey, isShow, setShow }) => {
  const [image, setImage] = useState();
  const setLoading = useContext(LazyContext);
  const navigate = useNavigate();

  const imageChange = (e) => {
    const img = e.target.files[0];

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

    console.log(e.target[0].files[0]);

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
            <div className="img-catal">
              <input type="file" name="image" onChange={imageChange} />
              {image && <img src={image} alt="" />}
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
