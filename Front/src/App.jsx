import { Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "./components/layout/layout";
import IsAuth from "./components/Auth/is-auth";
import ChangePass from "./pages/change-pass/change-pass";

const LazyMain = React.lazy(() => import("./pages/main/main"));
const LazyCatalog = React.lazy(() => import("./pages/catalog/catalog"));
const LazySubCatalog = React.lazy(() =>
  import("./pages/sub-catalog/sub-catalog")
);
const LazySize = React.lazy(() => import("./pages/size/size-main/size"));
const LazySizeCloth = React.lazy(() =>
  import("./pages/size/size-clothing/size-clothing")
);
const LazySizeBoots = React.lazy(() =>
  import("./pages/size/size-boots/size-boots")
);
const LazyAdmin = React.lazy(() => import("./pages/admin/auth"));
const LazyContact = React.lazy(() => import("./pages/contact/contact"));
const LazyComapny = React.lazy(() => import("./pages/company/company"));
const LazyError = React.lazy(() => import("./pages/error/error"));
const LazyProducts = React.lazy(() => import("./pages/products/products"));
const LazyProduct = React.lazy(() => import("./pages/product/product"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LazyMain />} />
        <Route path="catalog" element={<LazyCatalog />} />
        <Route path="catalog/:name" element={<LazySubCatalog />} />
        <Route path="products" element={<LazyProducts />} />
        <Route path="products/:name" element={<LazyProducts />} />
        <Route path="product/:id" element={<LazyProduct />} />
        <Route path="contact" element={<LazyContact />} />
        <Route path="company" element={<LazyComapny />} />
        <Route path="size" element={<LazySize />} />
        <Route path="size/clothing" element={<LazySizeCloth />} />
        <Route path="size/boots" element={<LazySizeBoots />} />
        <Route path="admin" element={<LazyAdmin />} />
        <Route
          path="admin/change-pass"
          element={
            <IsAuth>
              <ChangePass />
            </IsAuth>
          }
        />
      </Route>
      <Route path="*" element={<LazyError />} />
    </Routes>
  );
};

export default App;
