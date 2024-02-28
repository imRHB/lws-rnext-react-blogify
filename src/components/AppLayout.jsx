import React from "react";

import Footer from "./shared/Footer";
import Header from "./shared/Header";

export default function AppLayout({ children, authPage }) {
    return (
        <React.Fragment>
            {!authPage && <Header />}

            <main className="container">{children}</main>

            {!authPage && <Footer />}
        </React.Fragment>
    );
}
