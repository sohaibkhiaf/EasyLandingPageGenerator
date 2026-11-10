import { useEffect } from "react";
import styles from "../../css/Layouts/StorePageLayout.module.css";
import Footer from "../Components/Footer.jsx";
import StorePageHeader from "../Components/StorePageHeader.jsx";
import {URL as conn_URL} from '../connection.js';
import { Head } from "@inertiajs/react";
import CartSidePanel from "../Components/CartSidePanel.jsx";
import ProductSidePanel from "../Components/ProductSidePanel.jsx";
import { StoreProvider } from "../StoreContext.jsx";

function StorePageLayout({children}) {

    // meta pixel initialization
    useEffect(() => {
        if (window.fbq) {
            fbq("track", "PageView");
            return;
        }

        !(function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod
                ? n.callMethod.apply(n, arguments)
                : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = true;
            n.version = "2.0";
            n.queue = [];
            t = b.createElement(e);
            t.async = true;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

        fbq("init", children.props.project.data.meta_pixel_id);
        fbq("track", "PageView");
    }, []);

    // get current language from local storage
    let currentLanguage = localStorage.getItem('DEFAULT_LANGUAGE_'+children.props.project.data.id)
        || children.props.project.data.default_language;

    // this sets fallback language= en
    if (!currentLanguage){ currentLanguage = 'en'; }

    // extract page direction
    let currentDirection = currentLanguage == 'ar' ? 'rtl': 'ltr';

    // set page direction and language
    document.documentElement.dir = currentDirection;
    document.documentElement.lang = currentLanguage;

    // user styles
    let mainStyle = {backgroundColor: children.props.theme.data.body_color, };
    document.body.style.backgroundColor = children.props.theme.data.background_color;

    return (
        <>
        {/* Store context provider */}
        <StoreProvider pjtId={children.props.project.data.id}>
            {/* Head (icon/ title) */}
            <Head>
                {children.props.project.data.icon_url != null ?
                (<link rel="icon" type="image/png"
                    href={conn_URL+ "uploads/"+children.props.project.data.icon_url} />)
                :
                (<link rel="icon" type="image/png"
                    href={conn_URL+ "placeholder/shape.svg"} />)
                }
            </Head>

            {/* Store header */}
            <StorePageHeader project={children.props.project.data} 
                theme={children.props.theme.data}
                shippings={children.props.shippings.data} />

            {/* Store page  */}
            <main className={styles.main} style={mainStyle}>
                {children}
            </main>
            
            {/* Cart side panel */}
            <CartSidePanel shippings={children.props.shippings.data} 
                project={children.props.project.data} 
                theme={children.props.theme.data} />

            {/* Product side panel */}
            <ProductSidePanel project={children.props.project.data}
                theme={children.props.theme.data} />

            {/* Footer */}
            <Footer project={children.props.project.data} theme={children.props.theme.data} />
        </StoreProvider>
        </>
    );
}

export default StorePageLayout;

