import { createContext, useState } from "react";
import LazyLoad from "../lazy-load/lazy-load";

export const LazyContext = createContext();

const LazyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <LazyContext.Provider value={setLoading}>
        {loading && <LazyLoad />}
        {children}
      </LazyContext.Provider>
    </>
  );
};

export default LazyProvider;
