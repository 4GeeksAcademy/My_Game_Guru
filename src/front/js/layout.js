// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ScrollToTop from "./component/scrollToTop";
// import { BackendURL } from "./component/backendURL";

// import { Home } from "./pages/home";
// import { Favorites } from "./component/Favorites";
// import { Suggestions } from "./pages/suggestions";
// import { Single } from "./pages/single";
// import injectContext from "./store/appContext";

// import { Navbar } from "./component/Navbar";
// import { Footer } from "./component/Footer";

// //create your first component
// const Layout = () => {
//     //the basename is used when your project is published in a subdirectory and not in the root of the domain
//     // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
//     const basename = process.env.BASENAME || "";

//     if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
//         return <BackendURL />;

//     return (
//         <div>
//             <BrowserRouter basename={basename}>
//                 <ScrollToTop>
//                     <Navbar />
//                     <Routes>
//                         <Route element={<Home />} path="/" />
//                         <Route element={<Suggestions />} path="/suggestions" />
//                         <Route element={<Single />} path="/single/:theid" />
//                         <Route path="/favorites" element={<Favorites />} />
//                         <Route element={<h1>Not found!</h1>} />
//                     </Routes>
//                     <Footer />
//                 </ScrollToTop>
//             </BrowserRouter>
//         </div>
//     );
// };

// export default injectContext(Layout);
// src/layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Favorite } from "./pages/favorite"; // Verifica que la ruta sea correcta
import { Suggestions } from "./pages/suggestions";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";

const Layout = () => {
    // the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
        return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/suggestions" element={<Suggestions />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="/favorites" element={<Favorite />} /> {/* Ruta para Favoritos */}
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
