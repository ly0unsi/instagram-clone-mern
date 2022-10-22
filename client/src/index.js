import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/ReduxStore";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
ReactDOM.render(
  <Provider store={store}>

    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>

  </Provider>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();

