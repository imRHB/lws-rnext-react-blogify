import React from "react";

import Divider from "../shared/Divider";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

export default function AppLayout({ children, authPage }) {
    return (
        <React.Fragment>
            {!authPage && <Header />}

            <main>{children}</main>

            {!authPage && <Divider width="full" />}
            {!authPage && <Footer />}
        </React.Fragment>
    );
}
