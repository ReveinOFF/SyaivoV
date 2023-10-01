import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!config.headers["Authorization"] && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const token = localStorage.getItem("token");

    if (
      (error.response.status === 401 || error.response.status) === 400 &&
      token
    ) {
      localStorage.removeItem("token");

      window.location.reload();
      window.location.pathname = "/";

      return axios(error.config);
    }

    return error;
  }
);
