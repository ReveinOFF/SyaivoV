import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LazyContext } from "../lazy-context/lazy-contex";
import axios from "axios";

const AdminConf = () => {
  const [searchParams] = useSearchParams();
  const setLoading = useContext(LazyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const Confirm = async () => {
      setLoading(true);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_API}/api/auth/confirm`,
          { token: searchParams.get("token") }
        );
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.get("token")) {
      Confirm();
    } else {
      navigate("/error");
    }
  }, [searchParams, setLoading, navigate]);

  return null;
};

export default AdminConf;
