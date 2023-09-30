import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import LazyLoad from "./components/lazy-load/lazy-load";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<LazyLoad />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);

reportWebVitals();
