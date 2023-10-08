import "./products-modalStyle.scss";
import cross from "../../assets/img/products/icon-close-512.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { LazyContext } from "../lazy-context/lazy-contex";
import axios from "axios";

const ProductsModal = ({ isShow, setShow }) => {
  const [image, setImage] = useState();
  const setLoading = useContext(LazyContext);
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState();
  const [catalogValue, setCatalogValue] = useState();
  const [subcatalog, setSubcatalog] = useState();
  const catalogRef = useRef();
  const subcatalogRef = useRef();

  useEffect(() => {
    const GetCatalog = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/catalog/only`
      );

      setCatalog(res.data);
    };

    GetCatalog();
  }, []);

  const imageChange = (e) => {
    const createUrl = URL.createObjectURL(e.target.files[0]);

    setImage(URL.createObjectURL(e.target.files[0]));

    URL.revokeObjectURL(createUrl);
  };

  const handleSubmite = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);
    formData.set("image", e.target[0].files[0]);

    if (catalogRef.current.value !== "null") {
      const id = catalog.find(
        (item) => item.key_name === catalogRef.current.value
      ).id;
      formData.set("catalog_id", id);
    } else formData.delete("catalog_id");

    if (subcatalogRef.current && subcatalogRef.current.value !== "null")
      formData.set("subcatalog_id", parseInt(subcatalogRef.current.value));
    else formData.delete("subcatalog_id");

    await axios
      .post(`${process.env.REACT_APP_SERVER_API}/api/product`, formData)
      .then((res) => {
        if (res.status === 201) window.location.reload();
        else navigate("/error");
      })
      .finally(() => setLoading(false));
  };

  const catalogChange = async (e) => {
    if (e.target.value !== "null") {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/subcatalog/${e.target.value}`
      );

      setSubcatalog(res.data);
    }

    setCatalogValue(e.target.value);
  };

  return (
    <>
      {isShow && (
        <div className="products-modal">
          <form onSubmit={handleSubmite} className="products-block">
            <img src={cross} alt="close" onClick={setShow} />
            <div className="img-catal">
              <input type="file" name="image" onChange={imageChange} />
              {image && <img src={image} alt="" />}
            </div>
            <input type="text" name="name" placeholder="Назва товара" />
            <input
              type="number"
              name="price"
              defaultValue={0}
              placeholder="Ціна товара"
            />
            <textarea name="description" placeholder="Опис товара" />
            <select name="catalog_id" onChange={catalogChange} ref={catalogRef}>
              <option value="null">Каталог товара</option>
              {catalog &&
                catalog.map((item) => (
                  <option key={item.id} value={item.key_name}>
                    {item.name}
                  </option>
                ))}
            </select>
            {subcatalog && (
              <select name="subcatalog_id" ref={subcatalogRef}>
                <option value={"null"}>Під-каталог товара</option>

                {subcatalog.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            {(catalogValue === "boots" || catalogValue === "gloves") && (
              <input
                type="text"
                name="material"
                placeholder="Матеріал товара"
              />
            )}
            {catalogValue === "clothing" && (
              <>
                <input type="text" name="fabric" placeholder="Ткань товара" />
                <input
                  type="text"
                  name="fabric_warehouse"
                  placeholder="Склад тканини"
                />
              </>
            )}
            {(catalogValue === "clothing" ||
              catalogValue === "boots" ||
              catalogValue === "gloves") && (
              <>
                <input type="text" name="color" placeholder="Колір товара" />
                <input type="text" name="size" placeholder="Розмір товара" />
              </>
            )}
            <button type="submit">Створити</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ProductsModal;
