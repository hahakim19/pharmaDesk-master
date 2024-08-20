import React from "react";
import Navbar from "../Components/Navbar.jsx";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import NotFound from "../Components/NotFound.jsx";
import Home from "./home.jsx";
import Layout from "./layout.jsx";
import { Helmet } from 'react-helmet';
import { useStateContext } from "../Context/ContextProvider.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {

    const { canceling, setCanceling } = useStateContext()
    return (
        <HashRouter>
            <Helmet>
                <meta
                    http-equiv="Content-Security-Policy"
                    content="default-src 'self'; connect-src 'self' ws://pharma-back.onrender.com https://pharma-back.onrender.com; img-src 'self' http://res.cloudinary.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
                />
            </Helmet>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='store' element={<NotFound />} />
                    <Route path='discover' element={<NotFound />} />
                </Route>
                <Route path='/stock' element={<Layout />}>
                    <Route index element={<NotFound />} />
                    <Route path='transactions' element={<NotFound />} />
                    <Route path='database' element={<NotFound />} />
                </Route>
            </Routes>
            <ToastContainer />
        </HashRouter>
    );
}