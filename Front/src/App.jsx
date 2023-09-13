import { Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "./components/layout/layout";

const LazyMain = React.lazy(() => import("./pages/main/main"));
const LazyCatalog = React.lazy(() => import("./pages/catalog/catalog"));
const LazySize = React.lazy(() => import("./pages/size/size"));
const LazyContact = React.lazy(() => import("./pages/contact/contact"));
const LazyComapny = React.lazy(() => import("./pages/company/company"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LazyMain />} />
        <Route path="catalog" element={<LazyCatalog />} />
        <Route path="size" element={<LazySize />} />
        <Route path="contact" element={<LazyContact />} />
        <Route path="company" element={<LazyComapny />} />
      </Route>
    </Routes>
  );
};

export default App;
