import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Favorites } from "./pages/favorites";
import { Suggestions } from "./pages/suggestions";
import { Single } from "./pages/single";
import { Aboutus } from "./pages/aboutus";
import injectContext from "./store/appContext";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import { Context } from "./store/appContext";

const Layout = () => {
    const { store } = useContext(Context);
    const themeClass = store.theme === "dark" ? "dark-theme" : "light-theme";

    useEffect(() => {
        document.body.className = themeClass;
    }, [themeClass]);

    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
        return <BackendURL />;

    return (
        <div className={themeClass}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/suggestions" element={<Suggestions />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/aboutus" element={<Aboutus />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
