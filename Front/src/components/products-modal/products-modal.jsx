import "./products-modalStyle.scss";
import cross from "../../assets/img/products/icon-close-512.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { LazyContext } from "../lazy-context/lazy-contex";
import axios from "axios";
import reducer from "../reducer/product-reducer";

const ProductsModal = ({ setShow, id }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const [image, setImage] = useState();
  const setLoading = useContext(LazyContext);
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState();
  const [subcatalog, setSubcatalog] = useState();
  const imageRef = useRef();

  useEffect(() => {
    if (id) {
      const GetProduct = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_API}/api/product/${id}`
        );

        dispatch({ type: "SET", payload: res.data });

        if (res.data.image)
          setImage(
            `${process.env.REACT_APP_SERVER_API}/static/${res.data.image}`
          );
      };

      GetProduct();
    }
  }, [id]);

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
    if (e.target.files[0]) {
      const createUrl = URL.createObjectURL(e.target.files[0]);

      setImage(URL.createObjectURL(e.target.files[0]));

      URL.revokeObjectURL(createUrl);
    } else setImage(null);
  };

  const handleSubmite = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    formData.delete("btm_submite");

    if (e.target[0]?.files[0]) formData.set("image", e.target[0].files[0]);
    else formData.delete("image");

    if (!id) {
      await axios
        .post(`${process.env.REACT_APP_SERVER_API}/api/product`, formData)
        .then((res) => {
          if (res.status === 201) window.location.reload();
          else navigate("/error");
        })
        .finally(() => setLoading(false));
    } else {
      await axios
        .put(`${process.env.REACT_APP_SERVER_API}/api/product/${id}`, formData)
        .then((res) => {
          if (res.status === 201) window.location.reload();
          else navigate("/error");
        })
        .finally(() => setLoading(false));
    }
  };

  const catalogChange = async (e) => {
    if (e.target.value !== "null") {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/subcatalog/${e.target.value}`
      );

      setSubcatalog(res.data);
      dispatch({ type: "SET", payload: { catalog_key_name: e.target.value } });
    }
  };

  return (
    <>
      <div className="products-modal">
        <form onSubmit={handleSubmite} className="products-block">
          <img src={cross} alt="close" onClick={setShow} />
          <form onSubmit={(e) => e.preventDefault()}
            <div className="img-prod" onClick={() => imageRef.current.click()}>
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
              {image && <img src={image} alt="" />}
              <input
                type="file"
                name="image"
                onChange={imageChange}
                ref={imageRef}
              />
            </div>
            <input
              defaultValue={state.name}
              type="text"
              name="name"
              placeholder="Назва товара"
            />
            <input
              defaultValue={
                state.price && parseInt(state.price.replace(/[^\d,.]/g, ""))
              }
              type="number"
              name="price"
              placeholder="Ціна товара"
            />
            <textarea
              defaultValue={state.description}
              name="description"
              placeholder="Опис товара"
            />
            <select name="catalog_key" onChange={catalogChange}>
              <option value="null">Каталог товара</option>
              {catalog &&
                catalog.map((item) => (
                  <option
                    key={item.id}
                    value={item.key_name}
                    selected={state.catalog_key_name === item.key_name}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
            {subcatalog && (
              <select name="subcatalog_id">
                <option value={"null"}>Під-каталог товара</option>

                {subcatalog.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    selected={state.subcatalog_id === item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            {(state.catalog_key_name === "boots" ||
              state.catalog_key_name === "gloves") && (
              <input
                defaultValue={state.material}
                type="text"
                name="material"
                placeholder="Матеріал товара"
              />
            )}
            {state.catalog_key_name === "clothing" && (
              <>
                <input
                  defaultValue={state.fabric}
                  type="text"
                  name="fabric"
                  placeholder="Ткань товара"
                />
                <input
                  defaultValue={state.fabric_warehouse}
                  type="text"
                  name="fabric_warehouse"
                  placeholder="Склад тканини"
                />
              </>
            )}
            {(state.catalog_key_name === "clothing" ||
              state.catalog_key_name === "boots" ||
              state.catalog_key_name === "gloves") && (
              <>
                <input
                  defaultValue={state.color}
                  type="text"
                  name="color"
                  placeholder="Колір товара"
                />
                <input
                  defaultValue={state.size}
                  type="text"
                  name="size"
                  placeholder="Розмір товара"
                />
              </>
            )}
            <button name="btm_submite" type="submit">
              {id ? "Змінити" : "Створити"}
            </button>
          </form>
        </form>
      </div>
    </>
  );
};

export default ProductsModal;
