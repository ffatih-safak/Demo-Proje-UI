import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import  store  from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginManage from "./network/LoginManage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <div>
      <ProSidebarProvider>
        <BrowserRouter>
          <Provider store={store}>
            <LoginManage/>
            <ToastContainer />
          </Provider>
        </BrowserRouter>
      </ProSidebarProvider>
    </div>
);