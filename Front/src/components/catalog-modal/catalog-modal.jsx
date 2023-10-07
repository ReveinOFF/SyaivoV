import { useState } from "react";
import "./catalog-modalStyle.scss";
import cross from "../../assets/img/subcatalog/icon-close-512.png";

const CatalogModal = ({ key }) => {
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const imageChange = (e) => {
    const img = e.target.files[0];

    const createUrl = URL.createObjectURL(e.target.files[0]);

    setImage(URL.createObjectURL(e.target.files[0]));

    URL.revokeObjectURL(createUrl);
  };

  const handleSubmite = (e) => {
    e.preventDefault();
  };

  return (
    <div className="catalog-modal">
      <form onSubmit={handleSubmite} className="catalog-block">
        <img src={cross} alt="" />
        <div className="img-catal">
          <input type="file" name="image" onChange={imageChange} />
          {image && <img src={image} alt="" />}
        </div>
        <input type="text" name="name" placeholder="Назва каталогу" />
        <button type="submit">Створити</button>
      </form>
    </div>
  );
};

export default CatalogModal;
