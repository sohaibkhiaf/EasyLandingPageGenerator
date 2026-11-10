import { Head } from "@inertiajs/react";
import LandingPageHeader from "../Components/LandingPageHeader.jsx";
import styles from "../../css/Layouts/LandingPageLayout.module.css";
import Footer from "../Components/Footer.jsx";
import { useEffect } from "react";
import {URL as conn_URL} from '../connection.js';

function LandingPageLayout({children}) {

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
            <Head>
                {children.props.project.data.icon_url != null ?
                (<link rel="icon" type="image/png"
                    href={conn_URL+ "uploads/"+children.props.project.data.icon_url} />)
                :
                (<link rel="icon" type="image/png"
                    href={conn_URL+ "placeholder/shape.svg"} />)
                }
            </Head>

            <LandingPageHeader project={children.props.project.data} theme={children.props.theme.data} />

            <main className={styles.main} style={mainStyle}>
                {children}
            </main>

            <Footer project={children.props.project.data} theme={children.props.theme.data} />
        </>
    );
}


export default LandingPageLayout;
